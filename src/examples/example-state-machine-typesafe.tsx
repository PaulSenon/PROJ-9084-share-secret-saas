/* eslint-disable @typescript-eslint/no-explicit-any */
// step-machine.tsx
import React, { useEffect, useState } from "react";

/* ─────────── Types ─────────── */

export type StepStatus = "initial" | "pending" | "success" | "error";

export type Step<In, Out, Id extends string, UI = unknown> = {
  id: Id;
  /** Arbitrary data associated with this step – can be anything (React node, config, etc.) */
  uiObject: UI;
  /** Promise factory executed when the step runs */
  promise: (prev: In) => Promise<Out>;
};

export type StepState<S extends Step<any, any, string, any>> = {
  id: S["id"];
  uiObject: S["uiObject"];
  status: StepStatus;
  result?: S extends Step<any, infer Out, string, any> ? Out : never;
  error?: unknown;
};

/* ─────────── Fluent builder (compile-time) ─────────── */

class StepMachineBuilder<
  Prev,
  UI,
  Steps extends readonly Step<any, any, string, UI>[] = [],
> {
  constructor(private readonly steps: Steps = [] as unknown as Steps) {}

  step<Id extends string, Out>(
    cfg: Prev extends void
      ? {
          id: Id;
          uiObject: UI;
          promise: () => Promise<Out>;
        }
      : {
          id: Id;
          uiObject: UI;
          promise: (prev: Prev) => Promise<Out>;
        },
  ): StepMachineBuilder<Out, UI, [...Steps, Step<Prev, Out, Id, UI>]> {
    return new StepMachineBuilder([...this.steps, cfg] as const);
  }

  build() {
    return createMachine(this.steps);
  }
}

export function createStepMachine<Input = void, UI = unknown>() {
  return new StepMachineBuilder<Input, UI>();
}

/* ─────────── Runtime machine ─────────── */

function createMachine<Steps extends readonly Step<any, any, string, any>[]>(
  steps: Steps,
) {
  type UIOfSteps =
    Steps[number] extends Step<any, any, string, infer U> ? U : never;

  type StatesTuple = {
    [K in keyof Steps]: StepState<
      Extract<Steps[K], Step<any, any, string, UIOfSteps>>
    >;
  };

  const initialStates = Object.freeze(
    steps.map((s) => ({
      id: s.id,
      uiObject: s.uiObject as UIOfSteps,
      status: "initial" as StepStatus,
    })) as StatesTuple,
  );

  type Listener = (s: StatesTuple) => void;
  const listeners = new Set<Listener>();
  // Deep-copy snapshot before notifying listeners
  const notify = (s: StatesTuple) => {
    // Using JSON tricks for deep-copy; cast back to StatesTuple for type safety
    const cloned = JSON.parse(JSON.stringify(s)) as StatesTuple;
    listeners.forEach((l) => l(cloned));
  };

  let current: StatesTuple = [...initialStates] as StatesTuple;

  function update<I extends keyof Steps>(
    index: I,
    patch: Partial<StatesTuple[I]>,
  ) {
    current = current.map((s, i) =>
      i === index ? Object.freeze({ ...s, ...patch }) : s,
    ) as StatesTuple;
    notify(current);
  }

  async function run(
    input: Steps[0] extends Step<infer In, any, any, any> ? In : never,
  ) {
    current = initialStates;
    notify(current);

    let prev: unknown = input;
    for (let i = 0; i < steps.length; i++) {
      update(i as any, { status: "pending" } as Partial<StatesTuple[number]>);
      try {
        // @ts-expect-error – types guaranteed by builder
        const out: unknown = await steps[i].promise(prev);
        update(
          i as any,
          { status: "success", result: out } as Partial<StatesTuple[number]>,
        );
        prev = out;
      } catch (err) {
        update(
          i as any,
          { status: "error", error: err } as Partial<StatesTuple[number]>,
        );
        throw err;
      }
    }
    // Final snapshot after loop completes
    notify(current);

    return prev as Steps[number] extends Step<any, infer Last, any, any>
      ? Last
      : never;
  }

  return Object.freeze({
    /** live snapshot */
    get state() {
      return current;
    },
    /** subscribe/unsubscribe */
    subscribe(fn: Listener) {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
    /** kick it off */
    run,
  });
}

/* ─────────── React hook ─────────── */

export function useStepMachine<M extends ReturnType<typeof createMachine>>(
  machine: M,
) {
  const [state, setState] = useState(machine.state);
  useEffect(() => machine.subscribe(setState), [machine]);
  return { state, run: machine.run };
}

/* ─────────── Demo component ─────────── */

export function StepMachineDemo() {
  const machine = React.useMemo(
    () =>
      createStepMachine<{ plain: string }, React.ReactNode>()
        .step({
          id: "encrypt",
          uiObject: <>Encrypt</>,
          promise: async ({ plain }) => ({
            ciphertext: btoa(plain),
            key: "k42",
          }),
        })
        .step({
          id: "sign",
          uiObject: <>Sign</>,
          promise: async ({ ciphertext, key }) => ({
            ciphertext,
            signature: key + "-sig",
          }),
        })
        .build(),
    [],
  );

  const { state, run } = useStepMachine(machine);

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <button
        onClick={() => run({ plain: "hello" })}
        style={{
          padding: "6px 12px",
          borderRadius: 6,
          background: "#334",
          color: "#fff",
        }}
      >
        Start
      </button>

      <ol style={{ marginTop: 16 }}>
        {state.map((s) => (
          <li key={s.id}>
            {s.uiObject} — <strong>{s.status}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}

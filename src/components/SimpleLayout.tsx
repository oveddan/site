import { Container } from '@/components/Container';

export function SimpleLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">{title}</h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">{intro}</p>
      </header>
      <div className="mt-16 sm:mt-20">{children}</div>
    </Container>
  );
}

type ValueType = string; // 'boolean' | 'integer' | 'vec2' | 'vec3' etc...
type NodeType = 'function' | 'async-flow' | 'flow' | 'event-flow';
export type NodeCategory = // not even sure this is needed, seems very arbitrary
  'action' | 'query' | 'logic' | 'event' | 'variable' | 'flow' | 'time' | 'none';

export type SocketsDefinition = Record<string, ValueType>;

export interface NodeAPI<TInput extends SocketsDefinition, TOutput extends SocketsDefinition, TState> {
  read<T>(inValueName: keyof TInput): T;
  write<T>(outValueName: keyof TOutput, value: T): void;
  commit(outFlowName: keyof TOutput, fiberCompletedListener: (() => void) | undefined): void; // commits to current fiber unless 'async-flow' or 'event-flow'
  triggeringSocketName: keyof TInput;
  state: TState;
}

export type NodeDefinition<TInput extends SocketsDefinition, TOutput extends SocketsDefinition, TState> = {
  name: string;
  type: NodeType;
  aliases?: string[]; // for backwards compatibility
  category?: NodeCategory;
  description?: string;
  in: TInput;
  out: TOutput;
  initialState: TState;
  exec: (api: NodeAPI<TInput, TOutput, TState>) => TState;
};

export function makeNodeDefinition<TInput extends SocketsDefinition, TOutput extends SocketsDefinition, TState>(
  definition: NodeDefinition<TInput, TOutput, TState>
): NodeDefinition<TInput, TOutput, TState> {
  return definition;
}

const counterDefinition = makeNodeDefinition({
  name: 'count',
  type: 'flow',
  category: 'flow',
  in: {
    flow: 'flow',
    reset: 'flow',
  },
  out: {
    count: 'integer',
    flow: 'flow',
  },
  initialState: {
    count: 0,
  },
  exec: ({ commit, read, write, triggeringSocketName, state }) => {
    let count = state.count;
    switch (triggeringSocketName) {
      case 'flow': {
        count++;
        write('count', count);
        commit('flow');
        break;
      }
      case 'reset': {
        count = 0;
        break;
      }
      default:
        throw new Error('should not get here');
    }

    return {
      count,
    };
  },
});

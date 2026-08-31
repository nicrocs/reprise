
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Song
 * 
 */
export type Song = $Result.DefaultSelection<Prisma.$SongPayload>
/**
 * Model SongVideo
 * 
 */
export type SongVideo = $Result.DefaultSelection<Prisma.$SongVideoPayload>
/**
 * Model Tag
 * 
 */
export type Tag = $Result.DefaultSelection<Prisma.$TagPayload>
/**
 * Model Recording
 * 
 */
export type Recording = $Result.DefaultSelection<Prisma.$RecordingPayload>
/**
 * Model Instructor
 * 
 */
export type Instructor = $Result.DefaultSelection<Prisma.$InstructorPayload>
/**
 * Model Goal
 * 
 */
export type Goal = $Result.DefaultSelection<Prisma.$GoalPayload>
/**
 * Model SessionTemplate
 * 
 */
export type SessionTemplate = $Result.DefaultSelection<Prisma.$SessionTemplatePayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Key: {
  E_MAJOR: 'E_MAJOR',
  A_MAJOR: 'A_MAJOR',
  D_MAJOR: 'D_MAJOR',
  C_MAJOR: 'C_MAJOR',
  G_MAJOR: 'G_MAJOR',
  A_MINOR: 'A_MINOR',
  E_MINOR: 'E_MINOR',
  D_MINOR: 'D_MINOR',
  B_MAJOR: 'B_MAJOR',
  F_MAJOR: 'F_MAJOR',
  Bb_MAJOR: 'Bb_MAJOR',
  Eb_MAJOR: 'Eb_MAJOR',
  Ab_MAJOR: 'Ab_MAJOR',
  Db_MAJOR: 'Db_MAJOR',
  Gb_MAJOR: 'Gb_MAJOR',
  B_MINOR: 'B_MINOR',
  F_SHARP_MINOR: 'F_SHARP_MINOR',
  C_SHARP_MINOR: 'C_SHARP_MINOR',
  G_MINOR: 'G_MINOR',
  C_MINOR: 'C_MINOR',
  F_MINOR: 'F_MINOR',
  Bb_MINOR: 'Bb_MINOR'
};

export type Key = (typeof Key)[keyof typeof Key]


export const Tuning: {
  STANDARD: 'STANDARD',
  DROP_D: 'DROP_D',
  DROP_C: 'DROP_C',
  OPEN_G: 'OPEN_G',
  OPEN_D: 'OPEN_D',
  DADGAD: 'DADGAD'
};

export type Tuning = (typeof Tuning)[keyof typeof Tuning]


export const ThumbStyle: {
  STEADY: 'STEADY',
  ALTERNATING: 'ALTERNATING'
};

export type ThumbStyle = (typeof ThumbStyle)[keyof typeof ThumbStyle]


export const SongStatus: {
  LEARNING: 'LEARNING',
  MAINTENANCE: 'MAINTENANCE',
  WRITING: 'WRITING',
  RECORDING: 'RECORDING',
  MIXING: 'MIXING',
  STALLED: 'STALLED',
  RELEASED: 'RELEASED'
};

export type SongStatus = (typeof SongStatus)[keyof typeof SongStatus]

}

export type Key = $Enums.Key

export const Key: typeof $Enums.Key

export type Tuning = $Enums.Tuning

export const Tuning: typeof $Enums.Tuning

export type ThumbStyle = $Enums.ThumbStyle

export const ThumbStyle: typeof $Enums.ThumbStyle

export type SongStatus = $Enums.SongStatus

export const SongStatus: typeof $Enums.SongStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Songs
 * const songs = await prisma.song.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Songs
   * const songs = await prisma.song.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.song`: Exposes CRUD operations for the **Song** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Songs
    * const songs = await prisma.song.findMany()
    * ```
    */
  get song(): Prisma.SongDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.songVideo`: Exposes CRUD operations for the **SongVideo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SongVideos
    * const songVideos = await prisma.songVideo.findMany()
    * ```
    */
  get songVideo(): Prisma.SongVideoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tag`: Exposes CRUD operations for the **Tag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tag.findMany()
    * ```
    */
  get tag(): Prisma.TagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.recording`: Exposes CRUD operations for the **Recording** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Recordings
    * const recordings = await prisma.recording.findMany()
    * ```
    */
  get recording(): Prisma.RecordingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.instructor`: Exposes CRUD operations for the **Instructor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Instructors
    * const instructors = await prisma.instructor.findMany()
    * ```
    */
  get instructor(): Prisma.InstructorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.goal`: Exposes CRUD operations for the **Goal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Goals
    * const goals = await prisma.goal.findMany()
    * ```
    */
  get goal(): Prisma.GoalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sessionTemplate`: Exposes CRUD operations for the **SessionTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SessionTemplates
    * const sessionTemplates = await prisma.sessionTemplate.findMany()
    * ```
    */
  get sessionTemplate(): Prisma.SessionTemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.1
   * Query Engine version: 55ae170b1ced7fc6ed07a15f110549408c501bb3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Song: 'Song',
    SongVideo: 'SongVideo',
    Tag: 'Tag',
    Recording: 'Recording',
    Instructor: 'Instructor',
    Goal: 'Goal',
    SessionTemplate: 'SessionTemplate',
    Session: 'Session'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "song" | "songVideo" | "tag" | "recording" | "instructor" | "goal" | "sessionTemplate" | "session"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Song: {
        payload: Prisma.$SongPayload<ExtArgs>
        fields: Prisma.SongFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SongFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SongFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          findFirst: {
            args: Prisma.SongFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SongFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          findMany: {
            args: Prisma.SongFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>[]
          }
          create: {
            args: Prisma.SongCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          createMany: {
            args: Prisma.SongCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SongCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>[]
          }
          delete: {
            args: Prisma.SongDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          update: {
            args: Prisma.SongUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          deleteMany: {
            args: Prisma.SongDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SongUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SongUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>[]
          }
          upsert: {
            args: Prisma.SongUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongPayload>
          }
          aggregate: {
            args: Prisma.SongAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSong>
          }
          groupBy: {
            args: Prisma.SongGroupByArgs<ExtArgs>
            result: $Utils.Optional<SongGroupByOutputType>[]
          }
          count: {
            args: Prisma.SongCountArgs<ExtArgs>
            result: $Utils.Optional<SongCountAggregateOutputType> | number
          }
        }
      }
      SongVideo: {
        payload: Prisma.$SongVideoPayload<ExtArgs>
        fields: Prisma.SongVideoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SongVideoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongVideoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SongVideoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongVideoPayload>
          }
          findFirst: {
            args: Prisma.SongVideoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongVideoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SongVideoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongVideoPayload>
          }
          findMany: {
            args: Prisma.SongVideoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongVideoPayload>[]
          }
          create: {
            args: Prisma.SongVideoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongVideoPayload>
          }
          createMany: {
            args: Prisma.SongVideoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SongVideoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongVideoPayload>[]
          }
          delete: {
            args: Prisma.SongVideoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongVideoPayload>
          }
          update: {
            args: Prisma.SongVideoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongVideoPayload>
          }
          deleteMany: {
            args: Prisma.SongVideoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SongVideoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SongVideoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongVideoPayload>[]
          }
          upsert: {
            args: Prisma.SongVideoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SongVideoPayload>
          }
          aggregate: {
            args: Prisma.SongVideoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSongVideo>
          }
          groupBy: {
            args: Prisma.SongVideoGroupByArgs<ExtArgs>
            result: $Utils.Optional<SongVideoGroupByOutputType>[]
          }
          count: {
            args: Prisma.SongVideoCountArgs<ExtArgs>
            result: $Utils.Optional<SongVideoCountAggregateOutputType> | number
          }
        }
      }
      Tag: {
        payload: Prisma.$TagPayload<ExtArgs>
        fields: Prisma.TagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findFirst: {
            args: Prisma.TagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          findMany: {
            args: Prisma.TagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          create: {
            args: Prisma.TagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          createMany: {
            args: Prisma.TagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          delete: {
            args: Prisma.TagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          update: {
            args: Prisma.TagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          deleteMany: {
            args: Prisma.TagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>[]
          }
          upsert: {
            args: Prisma.TagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TagPayload>
          }
          aggregate: {
            args: Prisma.TagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTag>
          }
          groupBy: {
            args: Prisma.TagGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagGroupByOutputType>[]
          }
          count: {
            args: Prisma.TagCountArgs<ExtArgs>
            result: $Utils.Optional<TagCountAggregateOutputType> | number
          }
        }
      }
      Recording: {
        payload: Prisma.$RecordingPayload<ExtArgs>
        fields: Prisma.RecordingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RecordingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RecordingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>
          }
          findFirst: {
            args: Prisma.RecordingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RecordingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>
          }
          findMany: {
            args: Prisma.RecordingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>[]
          }
          create: {
            args: Prisma.RecordingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>
          }
          createMany: {
            args: Prisma.RecordingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RecordingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>[]
          }
          delete: {
            args: Prisma.RecordingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>
          }
          update: {
            args: Prisma.RecordingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>
          }
          deleteMany: {
            args: Prisma.RecordingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RecordingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RecordingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>[]
          }
          upsert: {
            args: Prisma.RecordingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RecordingPayload>
          }
          aggregate: {
            args: Prisma.RecordingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRecording>
          }
          groupBy: {
            args: Prisma.RecordingGroupByArgs<ExtArgs>
            result: $Utils.Optional<RecordingGroupByOutputType>[]
          }
          count: {
            args: Prisma.RecordingCountArgs<ExtArgs>
            result: $Utils.Optional<RecordingCountAggregateOutputType> | number
          }
        }
      }
      Instructor: {
        payload: Prisma.$InstructorPayload<ExtArgs>
        fields: Prisma.InstructorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InstructorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InstructorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>
          }
          findFirst: {
            args: Prisma.InstructorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InstructorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>
          }
          findMany: {
            args: Prisma.InstructorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>[]
          }
          create: {
            args: Prisma.InstructorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>
          }
          createMany: {
            args: Prisma.InstructorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InstructorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>[]
          }
          delete: {
            args: Prisma.InstructorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>
          }
          update: {
            args: Prisma.InstructorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>
          }
          deleteMany: {
            args: Prisma.InstructorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InstructorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InstructorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>[]
          }
          upsert: {
            args: Prisma.InstructorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstructorPayload>
          }
          aggregate: {
            args: Prisma.InstructorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstructor>
          }
          groupBy: {
            args: Prisma.InstructorGroupByArgs<ExtArgs>
            result: $Utils.Optional<InstructorGroupByOutputType>[]
          }
          count: {
            args: Prisma.InstructorCountArgs<ExtArgs>
            result: $Utils.Optional<InstructorCountAggregateOutputType> | number
          }
        }
      }
      Goal: {
        payload: Prisma.$GoalPayload<ExtArgs>
        fields: Prisma.GoalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GoalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GoalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          findFirst: {
            args: Prisma.GoalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GoalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          findMany: {
            args: Prisma.GoalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          create: {
            args: Prisma.GoalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          createMany: {
            args: Prisma.GoalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GoalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          delete: {
            args: Prisma.GoalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          update: {
            args: Prisma.GoalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          deleteMany: {
            args: Prisma.GoalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GoalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GoalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>[]
          }
          upsert: {
            args: Prisma.GoalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GoalPayload>
          }
          aggregate: {
            args: Prisma.GoalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGoal>
          }
          groupBy: {
            args: Prisma.GoalGroupByArgs<ExtArgs>
            result: $Utils.Optional<GoalGroupByOutputType>[]
          }
          count: {
            args: Prisma.GoalCountArgs<ExtArgs>
            result: $Utils.Optional<GoalCountAggregateOutputType> | number
          }
        }
      }
      SessionTemplate: {
        payload: Prisma.$SessionTemplatePayload<ExtArgs>
        fields: Prisma.SessionTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionTemplatePayload>
          }
          findFirst: {
            args: Prisma.SessionTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionTemplatePayload>
          }
          findMany: {
            args: Prisma.SessionTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionTemplatePayload>[]
          }
          create: {
            args: Prisma.SessionTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionTemplatePayload>
          }
          createMany: {
            args: Prisma.SessionTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionTemplatePayload>[]
          }
          delete: {
            args: Prisma.SessionTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionTemplatePayload>
          }
          update: {
            args: Prisma.SessionTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionTemplatePayload>
          }
          deleteMany: {
            args: Prisma.SessionTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionTemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionTemplatePayload>[]
          }
          upsert: {
            args: Prisma.SessionTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionTemplatePayload>
          }
          aggregate: {
            args: Prisma.SessionTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSessionTemplate>
          }
          groupBy: {
            args: Prisma.SessionTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<SessionTemplateCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    song?: SongOmit
    songVideo?: SongVideoOmit
    tag?: TagOmit
    recording?: RecordingOmit
    instructor?: InstructorOmit
    goal?: GoalOmit
    sessionTemplate?: SessionTemplateOmit
    session?: SessionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SongCountOutputType
   */

  export type SongCountOutputType = {
    sessions: number
    videos: number
  }

  export type SongCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | SongCountOutputTypeCountSessionsArgs
    videos?: boolean | SongCountOutputTypeCountVideosArgs
  }

  // Custom InputTypes
  /**
   * SongCountOutputType without action
   */
  export type SongCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongCountOutputType
     */
    select?: SongCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SongCountOutputType without action
   */
  export type SongCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * SongCountOutputType without action
   */
  export type SongCountOutputTypeCountVideosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SongVideoWhereInput
  }


  /**
   * Count Type TagCountOutputType
   */

  export type TagCountOutputType = {
    sessions: number
  }

  export type TagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | TagCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagCountOutputType
     */
    select?: TagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagCountOutputType without action
   */
  export type TagCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type InstructorCountOutputType
   */

  export type InstructorCountOutputType = {
    sessions: number
  }

  export type InstructorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | InstructorCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * InstructorCountOutputType without action
   */
  export type InstructorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstructorCountOutputType
     */
    select?: InstructorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InstructorCountOutputType without action
   */
  export type InstructorCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type GoalCountOutputType
   */

  export type GoalCountOutputType = {
    sessions: number
  }

  export type GoalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | GoalCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * GoalCountOutputType without action
   */
  export type GoalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GoalCountOutputType
     */
    select?: GoalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GoalCountOutputType without action
   */
  export type GoalCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type SessionTemplateCountOutputType
   */

  export type SessionTemplateCountOutputType = {
    sessions: number
  }

  export type SessionTemplateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | SessionTemplateCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * SessionTemplateCountOutputType without action
   */
  export type SessionTemplateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionTemplateCountOutputType
     */
    select?: SessionTemplateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionTemplateCountOutputType without action
   */
  export type SessionTemplateCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type SessionCountOutputType
   */

  export type SessionCountOutputType = {
    tags: number
    recordings: number
  }

  export type SessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | SessionCountOutputTypeCountTagsArgs
    recordings?: boolean | SessionCountOutputTypeCountRecordingsArgs
  }

  // Custom InputTypes
  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionCountOutputType
     */
    select?: SessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountRecordingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecordingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Song
   */

  export type AggregateSong = {
    _count: SongCountAggregateOutputType | null
    _avg: SongAvgAggregateOutputType | null
    _sum: SongSumAggregateOutputType | null
    _min: SongMinAggregateOutputType | null
    _max: SongMaxAggregateOutputType | null
  }

  export type SongAvgAggregateOutputType = {
    capo: number | null
  }

  export type SongSumAggregateOutputType = {
    capo: number | null
  }

  export type SongMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    key: $Enums.Key | null
    capo: number | null
    tuning: $Enums.Tuning | null
    thumbStyle: $Enums.ThumbStyle | null
    status: $Enums.SongStatus | null
    currentBlocker: string | null
    createdAt: Date | null
  }

  export type SongMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    key: $Enums.Key | null
    capo: number | null
    tuning: $Enums.Tuning | null
    thumbStyle: $Enums.ThumbStyle | null
    status: $Enums.SongStatus | null
    currentBlocker: string | null
    createdAt: Date | null
  }

  export type SongCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    key: number
    capo: number
    tuning: number
    thumbStyle: number
    status: number
    currentBlocker: number
    createdAt: number
    _all: number
  }


  export type SongAvgAggregateInputType = {
    capo?: true
  }

  export type SongSumAggregateInputType = {
    capo?: true
  }

  export type SongMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    key?: true
    capo?: true
    tuning?: true
    thumbStyle?: true
    status?: true
    currentBlocker?: true
    createdAt?: true
  }

  export type SongMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    key?: true
    capo?: true
    tuning?: true
    thumbStyle?: true
    status?: true
    currentBlocker?: true
    createdAt?: true
  }

  export type SongCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    key?: true
    capo?: true
    tuning?: true
    thumbStyle?: true
    status?: true
    currentBlocker?: true
    createdAt?: true
    _all?: true
  }

  export type SongAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Song to aggregate.
     */
    where?: SongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Songs to fetch.
     */
    orderBy?: SongOrderByWithRelationInput | SongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Songs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Songs
    **/
    _count?: true | SongCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SongAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SongSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SongMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SongMaxAggregateInputType
  }

  export type GetSongAggregateType<T extends SongAggregateArgs> = {
        [P in keyof T & keyof AggregateSong]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSong[P]>
      : GetScalarType<T[P], AggregateSong[P]>
  }




  export type SongGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SongWhereInput
    orderBy?: SongOrderByWithAggregationInput | SongOrderByWithAggregationInput[]
    by: SongScalarFieldEnum[] | SongScalarFieldEnum
    having?: SongScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SongCountAggregateInputType | true
    _avg?: SongAvgAggregateInputType
    _sum?: SongSumAggregateInputType
    _min?: SongMinAggregateInputType
    _max?: SongMaxAggregateInputType
  }

  export type SongGroupByOutputType = {
    id: string
    userId: string
    title: string
    key: $Enums.Key | null
    capo: number | null
    tuning: $Enums.Tuning
    thumbStyle: $Enums.ThumbStyle | null
    status: $Enums.SongStatus
    currentBlocker: string | null
    createdAt: Date
    _count: SongCountAggregateOutputType | null
    _avg: SongAvgAggregateOutputType | null
    _sum: SongSumAggregateOutputType | null
    _min: SongMinAggregateOutputType | null
    _max: SongMaxAggregateOutputType | null
  }

  type GetSongGroupByPayload<T extends SongGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SongGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SongGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SongGroupByOutputType[P]>
            : GetScalarType<T[P], SongGroupByOutputType[P]>
        }
      >
    >


  export type SongSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    key?: boolean
    capo?: boolean
    tuning?: boolean
    thumbStyle?: boolean
    status?: boolean
    currentBlocker?: boolean
    createdAt?: boolean
    sessions?: boolean | Song$sessionsArgs<ExtArgs>
    videos?: boolean | Song$videosArgs<ExtArgs>
    _count?: boolean | SongCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["song"]>

  export type SongSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    key?: boolean
    capo?: boolean
    tuning?: boolean
    thumbStyle?: boolean
    status?: boolean
    currentBlocker?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["song"]>

  export type SongSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    key?: boolean
    capo?: boolean
    tuning?: boolean
    thumbStyle?: boolean
    status?: boolean
    currentBlocker?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["song"]>

  export type SongSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    key?: boolean
    capo?: boolean
    tuning?: boolean
    thumbStyle?: boolean
    status?: boolean
    currentBlocker?: boolean
    createdAt?: boolean
  }

  export type SongOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "key" | "capo" | "tuning" | "thumbStyle" | "status" | "currentBlocker" | "createdAt", ExtArgs["result"]["song"]>
  export type SongInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | Song$sessionsArgs<ExtArgs>
    videos?: boolean | Song$videosArgs<ExtArgs>
    _count?: boolean | SongCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SongIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SongIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SongPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Song"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      videos: Prisma.$SongVideoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      key: $Enums.Key | null
      capo: number | null
      tuning: $Enums.Tuning
      thumbStyle: $Enums.ThumbStyle | null
      status: $Enums.SongStatus
      currentBlocker: string | null
      createdAt: Date
    }, ExtArgs["result"]["song"]>
    composites: {}
  }

  type SongGetPayload<S extends boolean | null | undefined | SongDefaultArgs> = $Result.GetResult<Prisma.$SongPayload, S>

  type SongCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SongFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SongCountAggregateInputType | true
    }

  export interface SongDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Song'], meta: { name: 'Song' } }
    /**
     * Find zero or one Song that matches the filter.
     * @param {SongFindUniqueArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SongFindUniqueArgs>(args: SelectSubset<T, SongFindUniqueArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Song that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SongFindUniqueOrThrowArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SongFindUniqueOrThrowArgs>(args: SelectSubset<T, SongFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Song that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongFindFirstArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SongFindFirstArgs>(args?: SelectSubset<T, SongFindFirstArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Song that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongFindFirstOrThrowArgs} args - Arguments to find a Song
     * @example
     * // Get one Song
     * const song = await prisma.song.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SongFindFirstOrThrowArgs>(args?: SelectSubset<T, SongFindFirstOrThrowArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Songs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Songs
     * const songs = await prisma.song.findMany()
     * 
     * // Get first 10 Songs
     * const songs = await prisma.song.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const songWithIdOnly = await prisma.song.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SongFindManyArgs>(args?: SelectSubset<T, SongFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Song.
     * @param {SongCreateArgs} args - Arguments to create a Song.
     * @example
     * // Create one Song
     * const Song = await prisma.song.create({
     *   data: {
     *     // ... data to create a Song
     *   }
     * })
     * 
     */
    create<T extends SongCreateArgs>(args: SelectSubset<T, SongCreateArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Songs.
     * @param {SongCreateManyArgs} args - Arguments to create many Songs.
     * @example
     * // Create many Songs
     * const song = await prisma.song.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SongCreateManyArgs>(args?: SelectSubset<T, SongCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Songs and returns the data saved in the database.
     * @param {SongCreateManyAndReturnArgs} args - Arguments to create many Songs.
     * @example
     * // Create many Songs
     * const song = await prisma.song.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Songs and only return the `id`
     * const songWithIdOnly = await prisma.song.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SongCreateManyAndReturnArgs>(args?: SelectSubset<T, SongCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Song.
     * @param {SongDeleteArgs} args - Arguments to delete one Song.
     * @example
     * // Delete one Song
     * const Song = await prisma.song.delete({
     *   where: {
     *     // ... filter to delete one Song
     *   }
     * })
     * 
     */
    delete<T extends SongDeleteArgs>(args: SelectSubset<T, SongDeleteArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Song.
     * @param {SongUpdateArgs} args - Arguments to update one Song.
     * @example
     * // Update one Song
     * const song = await prisma.song.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SongUpdateArgs>(args: SelectSubset<T, SongUpdateArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Songs.
     * @param {SongDeleteManyArgs} args - Arguments to filter Songs to delete.
     * @example
     * // Delete a few Songs
     * const { count } = await prisma.song.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SongDeleteManyArgs>(args?: SelectSubset<T, SongDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Songs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Songs
     * const song = await prisma.song.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SongUpdateManyArgs>(args: SelectSubset<T, SongUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Songs and returns the data updated in the database.
     * @param {SongUpdateManyAndReturnArgs} args - Arguments to update many Songs.
     * @example
     * // Update many Songs
     * const song = await prisma.song.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Songs and only return the `id`
     * const songWithIdOnly = await prisma.song.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SongUpdateManyAndReturnArgs>(args: SelectSubset<T, SongUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Song.
     * @param {SongUpsertArgs} args - Arguments to update or create a Song.
     * @example
     * // Update or create a Song
     * const song = await prisma.song.upsert({
     *   create: {
     *     // ... data to create a Song
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Song we want to update
     *   }
     * })
     */
    upsert<T extends SongUpsertArgs>(args: SelectSubset<T, SongUpsertArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Songs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongCountArgs} args - Arguments to filter Songs to count.
     * @example
     * // Count the number of Songs
     * const count = await prisma.song.count({
     *   where: {
     *     // ... the filter for the Songs we want to count
     *   }
     * })
    **/
    count<T extends SongCountArgs>(
      args?: Subset<T, SongCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SongCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Song.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SongAggregateArgs>(args: Subset<T, SongAggregateArgs>): Prisma.PrismaPromise<GetSongAggregateType<T>>

    /**
     * Group by Song.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SongGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SongGroupByArgs['orderBy'] }
        : { orderBy?: SongGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SongGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSongGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Song model
   */
  readonly fields: SongFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Song.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SongClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends Song$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Song$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    videos<T extends Song$videosArgs<ExtArgs> = {}>(args?: Subset<T, Song$videosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Song model
   */
  interface SongFieldRefs {
    readonly id: FieldRef<"Song", 'String'>
    readonly userId: FieldRef<"Song", 'String'>
    readonly title: FieldRef<"Song", 'String'>
    readonly key: FieldRef<"Song", 'Key'>
    readonly capo: FieldRef<"Song", 'Int'>
    readonly tuning: FieldRef<"Song", 'Tuning'>
    readonly thumbStyle: FieldRef<"Song", 'ThumbStyle'>
    readonly status: FieldRef<"Song", 'SongStatus'>
    readonly currentBlocker: FieldRef<"Song", 'String'>
    readonly createdAt: FieldRef<"Song", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Song findUnique
   */
  export type SongFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter, which Song to fetch.
     */
    where: SongWhereUniqueInput
  }

  /**
   * Song findUniqueOrThrow
   */
  export type SongFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter, which Song to fetch.
     */
    where: SongWhereUniqueInput
  }

  /**
   * Song findFirst
   */
  export type SongFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter, which Song to fetch.
     */
    where?: SongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Songs to fetch.
     */
    orderBy?: SongOrderByWithRelationInput | SongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Songs.
     */
    cursor?: SongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Songs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Songs.
     */
    distinct?: SongScalarFieldEnum | SongScalarFieldEnum[]
  }

  /**
   * Song findFirstOrThrow
   */
  export type SongFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter, which Song to fetch.
     */
    where?: SongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Songs to fetch.
     */
    orderBy?: SongOrderByWithRelationInput | SongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Songs.
     */
    cursor?: SongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Songs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Songs.
     */
    distinct?: SongScalarFieldEnum | SongScalarFieldEnum[]
  }

  /**
   * Song findMany
   */
  export type SongFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter, which Songs to fetch.
     */
    where?: SongWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Songs to fetch.
     */
    orderBy?: SongOrderByWithRelationInput | SongOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Songs.
     */
    cursor?: SongWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Songs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Songs.
     */
    skip?: number
    distinct?: SongScalarFieldEnum | SongScalarFieldEnum[]
  }

  /**
   * Song create
   */
  export type SongCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * The data needed to create a Song.
     */
    data: XOR<SongCreateInput, SongUncheckedCreateInput>
  }

  /**
   * Song createMany
   */
  export type SongCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Songs.
     */
    data: SongCreateManyInput | SongCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Song createManyAndReturn
   */
  export type SongCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * The data used to create many Songs.
     */
    data: SongCreateManyInput | SongCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Song update
   */
  export type SongUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * The data needed to update a Song.
     */
    data: XOR<SongUpdateInput, SongUncheckedUpdateInput>
    /**
     * Choose, which Song to update.
     */
    where: SongWhereUniqueInput
  }

  /**
   * Song updateMany
   */
  export type SongUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Songs.
     */
    data: XOR<SongUpdateManyMutationInput, SongUncheckedUpdateManyInput>
    /**
     * Filter which Songs to update
     */
    where?: SongWhereInput
    /**
     * Limit how many Songs to update.
     */
    limit?: number
  }

  /**
   * Song updateManyAndReturn
   */
  export type SongUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * The data used to update Songs.
     */
    data: XOR<SongUpdateManyMutationInput, SongUncheckedUpdateManyInput>
    /**
     * Filter which Songs to update
     */
    where?: SongWhereInput
    /**
     * Limit how many Songs to update.
     */
    limit?: number
  }

  /**
   * Song upsert
   */
  export type SongUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * The filter to search for the Song to update in case it exists.
     */
    where: SongWhereUniqueInput
    /**
     * In case the Song found by the `where` argument doesn't exist, create a new Song with this data.
     */
    create: XOR<SongCreateInput, SongUncheckedCreateInput>
    /**
     * In case the Song was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SongUpdateInput, SongUncheckedUpdateInput>
  }

  /**
   * Song delete
   */
  export type SongDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    /**
     * Filter which Song to delete.
     */
    where: SongWhereUniqueInput
  }

  /**
   * Song deleteMany
   */
  export type SongDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Songs to delete
     */
    where?: SongWhereInput
    /**
     * Limit how many Songs to delete.
     */
    limit?: number
  }

  /**
   * Song.sessions
   */
  export type Song$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Song.videos
   */
  export type Song$videosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongVideo
     */
    select?: SongVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongVideo
     */
    omit?: SongVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongVideoInclude<ExtArgs> | null
    where?: SongVideoWhereInput
    orderBy?: SongVideoOrderByWithRelationInput | SongVideoOrderByWithRelationInput[]
    cursor?: SongVideoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SongVideoScalarFieldEnum | SongVideoScalarFieldEnum[]
  }

  /**
   * Song without action
   */
  export type SongDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
  }


  /**
   * Model SongVideo
   */

  export type AggregateSongVideo = {
    _count: SongVideoCountAggregateOutputType | null
    _min: SongVideoMinAggregateOutputType | null
    _max: SongVideoMaxAggregateOutputType | null
  }

  export type SongVideoMinAggregateOutputType = {
    id: string | null
    songId: string | null
    label: string | null
    url: string | null
    createdAt: Date | null
  }

  export type SongVideoMaxAggregateOutputType = {
    id: string | null
    songId: string | null
    label: string | null
    url: string | null
    createdAt: Date | null
  }

  export type SongVideoCountAggregateOutputType = {
    id: number
    songId: number
    label: number
    url: number
    createdAt: number
    _all: number
  }


  export type SongVideoMinAggregateInputType = {
    id?: true
    songId?: true
    label?: true
    url?: true
    createdAt?: true
  }

  export type SongVideoMaxAggregateInputType = {
    id?: true
    songId?: true
    label?: true
    url?: true
    createdAt?: true
  }

  export type SongVideoCountAggregateInputType = {
    id?: true
    songId?: true
    label?: true
    url?: true
    createdAt?: true
    _all?: true
  }

  export type SongVideoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SongVideo to aggregate.
     */
    where?: SongVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SongVideos to fetch.
     */
    orderBy?: SongVideoOrderByWithRelationInput | SongVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SongVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SongVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SongVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SongVideos
    **/
    _count?: true | SongVideoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SongVideoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SongVideoMaxAggregateInputType
  }

  export type GetSongVideoAggregateType<T extends SongVideoAggregateArgs> = {
        [P in keyof T & keyof AggregateSongVideo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSongVideo[P]>
      : GetScalarType<T[P], AggregateSongVideo[P]>
  }




  export type SongVideoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SongVideoWhereInput
    orderBy?: SongVideoOrderByWithAggregationInput | SongVideoOrderByWithAggregationInput[]
    by: SongVideoScalarFieldEnum[] | SongVideoScalarFieldEnum
    having?: SongVideoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SongVideoCountAggregateInputType | true
    _min?: SongVideoMinAggregateInputType
    _max?: SongVideoMaxAggregateInputType
  }

  export type SongVideoGroupByOutputType = {
    id: string
    songId: string
    label: string
    url: string
    createdAt: Date
    _count: SongVideoCountAggregateOutputType | null
    _min: SongVideoMinAggregateOutputType | null
    _max: SongVideoMaxAggregateOutputType | null
  }

  type GetSongVideoGroupByPayload<T extends SongVideoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SongVideoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SongVideoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SongVideoGroupByOutputType[P]>
            : GetScalarType<T[P], SongVideoGroupByOutputType[P]>
        }
      >
    >


  export type SongVideoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    songId?: boolean
    label?: boolean
    url?: boolean
    createdAt?: boolean
    song?: boolean | SongDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["songVideo"]>

  export type SongVideoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    songId?: boolean
    label?: boolean
    url?: boolean
    createdAt?: boolean
    song?: boolean | SongDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["songVideo"]>

  export type SongVideoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    songId?: boolean
    label?: boolean
    url?: boolean
    createdAt?: boolean
    song?: boolean | SongDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["songVideo"]>

  export type SongVideoSelectScalar = {
    id?: boolean
    songId?: boolean
    label?: boolean
    url?: boolean
    createdAt?: boolean
  }

  export type SongVideoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "songId" | "label" | "url" | "createdAt", ExtArgs["result"]["songVideo"]>
  export type SongVideoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    song?: boolean | SongDefaultArgs<ExtArgs>
  }
  export type SongVideoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    song?: boolean | SongDefaultArgs<ExtArgs>
  }
  export type SongVideoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    song?: boolean | SongDefaultArgs<ExtArgs>
  }

  export type $SongVideoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SongVideo"
    objects: {
      song: Prisma.$SongPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      songId: string
      label: string
      url: string
      createdAt: Date
    }, ExtArgs["result"]["songVideo"]>
    composites: {}
  }

  type SongVideoGetPayload<S extends boolean | null | undefined | SongVideoDefaultArgs> = $Result.GetResult<Prisma.$SongVideoPayload, S>

  type SongVideoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SongVideoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SongVideoCountAggregateInputType | true
    }

  export interface SongVideoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SongVideo'], meta: { name: 'SongVideo' } }
    /**
     * Find zero or one SongVideo that matches the filter.
     * @param {SongVideoFindUniqueArgs} args - Arguments to find a SongVideo
     * @example
     * // Get one SongVideo
     * const songVideo = await prisma.songVideo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SongVideoFindUniqueArgs>(args: SelectSubset<T, SongVideoFindUniqueArgs<ExtArgs>>): Prisma__SongVideoClient<$Result.GetResult<Prisma.$SongVideoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SongVideo that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SongVideoFindUniqueOrThrowArgs} args - Arguments to find a SongVideo
     * @example
     * // Get one SongVideo
     * const songVideo = await prisma.songVideo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SongVideoFindUniqueOrThrowArgs>(args: SelectSubset<T, SongVideoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SongVideoClient<$Result.GetResult<Prisma.$SongVideoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SongVideo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongVideoFindFirstArgs} args - Arguments to find a SongVideo
     * @example
     * // Get one SongVideo
     * const songVideo = await prisma.songVideo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SongVideoFindFirstArgs>(args?: SelectSubset<T, SongVideoFindFirstArgs<ExtArgs>>): Prisma__SongVideoClient<$Result.GetResult<Prisma.$SongVideoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SongVideo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongVideoFindFirstOrThrowArgs} args - Arguments to find a SongVideo
     * @example
     * // Get one SongVideo
     * const songVideo = await prisma.songVideo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SongVideoFindFirstOrThrowArgs>(args?: SelectSubset<T, SongVideoFindFirstOrThrowArgs<ExtArgs>>): Prisma__SongVideoClient<$Result.GetResult<Prisma.$SongVideoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SongVideos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongVideoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SongVideos
     * const songVideos = await prisma.songVideo.findMany()
     * 
     * // Get first 10 SongVideos
     * const songVideos = await prisma.songVideo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const songVideoWithIdOnly = await prisma.songVideo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SongVideoFindManyArgs>(args?: SelectSubset<T, SongVideoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongVideoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SongVideo.
     * @param {SongVideoCreateArgs} args - Arguments to create a SongVideo.
     * @example
     * // Create one SongVideo
     * const SongVideo = await prisma.songVideo.create({
     *   data: {
     *     // ... data to create a SongVideo
     *   }
     * })
     * 
     */
    create<T extends SongVideoCreateArgs>(args: SelectSubset<T, SongVideoCreateArgs<ExtArgs>>): Prisma__SongVideoClient<$Result.GetResult<Prisma.$SongVideoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SongVideos.
     * @param {SongVideoCreateManyArgs} args - Arguments to create many SongVideos.
     * @example
     * // Create many SongVideos
     * const songVideo = await prisma.songVideo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SongVideoCreateManyArgs>(args?: SelectSubset<T, SongVideoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SongVideos and returns the data saved in the database.
     * @param {SongVideoCreateManyAndReturnArgs} args - Arguments to create many SongVideos.
     * @example
     * // Create many SongVideos
     * const songVideo = await prisma.songVideo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SongVideos and only return the `id`
     * const songVideoWithIdOnly = await prisma.songVideo.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SongVideoCreateManyAndReturnArgs>(args?: SelectSubset<T, SongVideoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongVideoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SongVideo.
     * @param {SongVideoDeleteArgs} args - Arguments to delete one SongVideo.
     * @example
     * // Delete one SongVideo
     * const SongVideo = await prisma.songVideo.delete({
     *   where: {
     *     // ... filter to delete one SongVideo
     *   }
     * })
     * 
     */
    delete<T extends SongVideoDeleteArgs>(args: SelectSubset<T, SongVideoDeleteArgs<ExtArgs>>): Prisma__SongVideoClient<$Result.GetResult<Prisma.$SongVideoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SongVideo.
     * @param {SongVideoUpdateArgs} args - Arguments to update one SongVideo.
     * @example
     * // Update one SongVideo
     * const songVideo = await prisma.songVideo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SongVideoUpdateArgs>(args: SelectSubset<T, SongVideoUpdateArgs<ExtArgs>>): Prisma__SongVideoClient<$Result.GetResult<Prisma.$SongVideoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SongVideos.
     * @param {SongVideoDeleteManyArgs} args - Arguments to filter SongVideos to delete.
     * @example
     * // Delete a few SongVideos
     * const { count } = await prisma.songVideo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SongVideoDeleteManyArgs>(args?: SelectSubset<T, SongVideoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SongVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongVideoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SongVideos
     * const songVideo = await prisma.songVideo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SongVideoUpdateManyArgs>(args: SelectSubset<T, SongVideoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SongVideos and returns the data updated in the database.
     * @param {SongVideoUpdateManyAndReturnArgs} args - Arguments to update many SongVideos.
     * @example
     * // Update many SongVideos
     * const songVideo = await prisma.songVideo.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SongVideos and only return the `id`
     * const songVideoWithIdOnly = await prisma.songVideo.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SongVideoUpdateManyAndReturnArgs>(args: SelectSubset<T, SongVideoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SongVideoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SongVideo.
     * @param {SongVideoUpsertArgs} args - Arguments to update or create a SongVideo.
     * @example
     * // Update or create a SongVideo
     * const songVideo = await prisma.songVideo.upsert({
     *   create: {
     *     // ... data to create a SongVideo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SongVideo we want to update
     *   }
     * })
     */
    upsert<T extends SongVideoUpsertArgs>(args: SelectSubset<T, SongVideoUpsertArgs<ExtArgs>>): Prisma__SongVideoClient<$Result.GetResult<Prisma.$SongVideoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SongVideos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongVideoCountArgs} args - Arguments to filter SongVideos to count.
     * @example
     * // Count the number of SongVideos
     * const count = await prisma.songVideo.count({
     *   where: {
     *     // ... the filter for the SongVideos we want to count
     *   }
     * })
    **/
    count<T extends SongVideoCountArgs>(
      args?: Subset<T, SongVideoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SongVideoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SongVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongVideoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SongVideoAggregateArgs>(args: Subset<T, SongVideoAggregateArgs>): Prisma.PrismaPromise<GetSongVideoAggregateType<T>>

    /**
     * Group by SongVideo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SongVideoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SongVideoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SongVideoGroupByArgs['orderBy'] }
        : { orderBy?: SongVideoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SongVideoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSongVideoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SongVideo model
   */
  readonly fields: SongVideoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SongVideo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SongVideoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    song<T extends SongDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SongDefaultArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SongVideo model
   */
  interface SongVideoFieldRefs {
    readonly id: FieldRef<"SongVideo", 'String'>
    readonly songId: FieldRef<"SongVideo", 'String'>
    readonly label: FieldRef<"SongVideo", 'String'>
    readonly url: FieldRef<"SongVideo", 'String'>
    readonly createdAt: FieldRef<"SongVideo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SongVideo findUnique
   */
  export type SongVideoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongVideo
     */
    select?: SongVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongVideo
     */
    omit?: SongVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongVideoInclude<ExtArgs> | null
    /**
     * Filter, which SongVideo to fetch.
     */
    where: SongVideoWhereUniqueInput
  }

  /**
   * SongVideo findUniqueOrThrow
   */
  export type SongVideoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongVideo
     */
    select?: SongVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongVideo
     */
    omit?: SongVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongVideoInclude<ExtArgs> | null
    /**
     * Filter, which SongVideo to fetch.
     */
    where: SongVideoWhereUniqueInput
  }

  /**
   * SongVideo findFirst
   */
  export type SongVideoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongVideo
     */
    select?: SongVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongVideo
     */
    omit?: SongVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongVideoInclude<ExtArgs> | null
    /**
     * Filter, which SongVideo to fetch.
     */
    where?: SongVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SongVideos to fetch.
     */
    orderBy?: SongVideoOrderByWithRelationInput | SongVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SongVideos.
     */
    cursor?: SongVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SongVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SongVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SongVideos.
     */
    distinct?: SongVideoScalarFieldEnum | SongVideoScalarFieldEnum[]
  }

  /**
   * SongVideo findFirstOrThrow
   */
  export type SongVideoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongVideo
     */
    select?: SongVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongVideo
     */
    omit?: SongVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongVideoInclude<ExtArgs> | null
    /**
     * Filter, which SongVideo to fetch.
     */
    where?: SongVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SongVideos to fetch.
     */
    orderBy?: SongVideoOrderByWithRelationInput | SongVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SongVideos.
     */
    cursor?: SongVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SongVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SongVideos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SongVideos.
     */
    distinct?: SongVideoScalarFieldEnum | SongVideoScalarFieldEnum[]
  }

  /**
   * SongVideo findMany
   */
  export type SongVideoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongVideo
     */
    select?: SongVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongVideo
     */
    omit?: SongVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongVideoInclude<ExtArgs> | null
    /**
     * Filter, which SongVideos to fetch.
     */
    where?: SongVideoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SongVideos to fetch.
     */
    orderBy?: SongVideoOrderByWithRelationInput | SongVideoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SongVideos.
     */
    cursor?: SongVideoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SongVideos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SongVideos.
     */
    skip?: number
    distinct?: SongVideoScalarFieldEnum | SongVideoScalarFieldEnum[]
  }

  /**
   * SongVideo create
   */
  export type SongVideoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongVideo
     */
    select?: SongVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongVideo
     */
    omit?: SongVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongVideoInclude<ExtArgs> | null
    /**
     * The data needed to create a SongVideo.
     */
    data: XOR<SongVideoCreateInput, SongVideoUncheckedCreateInput>
  }

  /**
   * SongVideo createMany
   */
  export type SongVideoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SongVideos.
     */
    data: SongVideoCreateManyInput | SongVideoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SongVideo createManyAndReturn
   */
  export type SongVideoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongVideo
     */
    select?: SongVideoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SongVideo
     */
    omit?: SongVideoOmit<ExtArgs> | null
    /**
     * The data used to create many SongVideos.
     */
    data: SongVideoCreateManyInput | SongVideoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongVideoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SongVideo update
   */
  export type SongVideoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongVideo
     */
    select?: SongVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongVideo
     */
    omit?: SongVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongVideoInclude<ExtArgs> | null
    /**
     * The data needed to update a SongVideo.
     */
    data: XOR<SongVideoUpdateInput, SongVideoUncheckedUpdateInput>
    /**
     * Choose, which SongVideo to update.
     */
    where: SongVideoWhereUniqueInput
  }

  /**
   * SongVideo updateMany
   */
  export type SongVideoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SongVideos.
     */
    data: XOR<SongVideoUpdateManyMutationInput, SongVideoUncheckedUpdateManyInput>
    /**
     * Filter which SongVideos to update
     */
    where?: SongVideoWhereInput
    /**
     * Limit how many SongVideos to update.
     */
    limit?: number
  }

  /**
   * SongVideo updateManyAndReturn
   */
  export type SongVideoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongVideo
     */
    select?: SongVideoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SongVideo
     */
    omit?: SongVideoOmit<ExtArgs> | null
    /**
     * The data used to update SongVideos.
     */
    data: XOR<SongVideoUpdateManyMutationInput, SongVideoUncheckedUpdateManyInput>
    /**
     * Filter which SongVideos to update
     */
    where?: SongVideoWhereInput
    /**
     * Limit how many SongVideos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongVideoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SongVideo upsert
   */
  export type SongVideoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongVideo
     */
    select?: SongVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongVideo
     */
    omit?: SongVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongVideoInclude<ExtArgs> | null
    /**
     * The filter to search for the SongVideo to update in case it exists.
     */
    where: SongVideoWhereUniqueInput
    /**
     * In case the SongVideo found by the `where` argument doesn't exist, create a new SongVideo with this data.
     */
    create: XOR<SongVideoCreateInput, SongVideoUncheckedCreateInput>
    /**
     * In case the SongVideo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SongVideoUpdateInput, SongVideoUncheckedUpdateInput>
  }

  /**
   * SongVideo delete
   */
  export type SongVideoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongVideo
     */
    select?: SongVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongVideo
     */
    omit?: SongVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongVideoInclude<ExtArgs> | null
    /**
     * Filter which SongVideo to delete.
     */
    where: SongVideoWhereUniqueInput
  }

  /**
   * SongVideo deleteMany
   */
  export type SongVideoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SongVideos to delete
     */
    where?: SongVideoWhereInput
    /**
     * Limit how many SongVideos to delete.
     */
    limit?: number
  }

  /**
   * SongVideo without action
   */
  export type SongVideoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SongVideo
     */
    select?: SongVideoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SongVideo
     */
    omit?: SongVideoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongVideoInclude<ExtArgs> | null
  }


  /**
   * Model Tag
   */

  export type AggregateTag = {
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  export type TagMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
  }

  export type TagMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
  }

  export type TagCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    _all: number
  }


  export type TagMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
  }

  export type TagMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
  }

  export type TagCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    _all?: true
  }

  export type TagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tag to aggregate.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tags
    **/
    _count?: true | TagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagMaxAggregateInputType
  }

  export type GetTagAggregateType<T extends TagAggregateArgs> = {
        [P in keyof T & keyof AggregateTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTag[P]>
      : GetScalarType<T[P], AggregateTag[P]>
  }




  export type TagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TagWhereInput
    orderBy?: TagOrderByWithAggregationInput | TagOrderByWithAggregationInput[]
    by: TagScalarFieldEnum[] | TagScalarFieldEnum
    having?: TagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagCountAggregateInputType | true
    _min?: TagMinAggregateInputType
    _max?: TagMaxAggregateInputType
  }

  export type TagGroupByOutputType = {
    id: string
    userId: string
    name: string
    _count: TagCountAggregateOutputType | null
    _min: TagMinAggregateOutputType | null
    _max: TagMaxAggregateOutputType | null
  }

  type GetTagGroupByPayload<T extends TagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagGroupByOutputType[P]>
            : GetScalarType<T[P], TagGroupByOutputType[P]>
        }
      >
    >


  export type TagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    sessions?: boolean | Tag$sessionsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tag"]>

  export type TagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
  }, ExtArgs["result"]["tag"]>

  export type TagSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
  }

  export type TagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name", ExtArgs["result"]["tag"]>
  export type TagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | Tag$sessionsArgs<ExtArgs>
    _count?: boolean | TagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tag"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
    }, ExtArgs["result"]["tag"]>
    composites: {}
  }

  type TagGetPayload<S extends boolean | null | undefined | TagDefaultArgs> = $Result.GetResult<Prisma.$TagPayload, S>

  type TagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagCountAggregateInputType | true
    }

  export interface TagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tag'], meta: { name: 'Tag' } }
    /**
     * Find zero or one Tag that matches the filter.
     * @param {TagFindUniqueArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TagFindUniqueArgs>(args: SelectSubset<T, TagFindUniqueArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TagFindUniqueOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TagFindUniqueOrThrowArgs>(args: SelectSubset<T, TagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TagFindFirstArgs>(args?: SelectSubset<T, TagFindFirstArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindFirstOrThrowArgs} args - Arguments to find a Tag
     * @example
     * // Get one Tag
     * const tag = await prisma.tag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TagFindFirstOrThrowArgs>(args?: SelectSubset<T, TagFindFirstOrThrowArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tag.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagWithIdOnly = await prisma.tag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TagFindManyArgs>(args?: SelectSubset<T, TagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tag.
     * @param {TagCreateArgs} args - Arguments to create a Tag.
     * @example
     * // Create one Tag
     * const Tag = await prisma.tag.create({
     *   data: {
     *     // ... data to create a Tag
     *   }
     * })
     * 
     */
    create<T extends TagCreateArgs>(args: SelectSubset<T, TagCreateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {TagCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TagCreateManyArgs>(args?: SelectSubset<T, TagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tags and returns the data saved in the database.
     * @param {TagCreateManyAndReturnArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tag = await prisma.tag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TagCreateManyAndReturnArgs>(args?: SelectSubset<T, TagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tag.
     * @param {TagDeleteArgs} args - Arguments to delete one Tag.
     * @example
     * // Delete one Tag
     * const Tag = await prisma.tag.delete({
     *   where: {
     *     // ... filter to delete one Tag
     *   }
     * })
     * 
     */
    delete<T extends TagDeleteArgs>(args: SelectSubset<T, TagDeleteArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tag.
     * @param {TagUpdateArgs} args - Arguments to update one Tag.
     * @example
     * // Update one Tag
     * const tag = await prisma.tag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TagUpdateArgs>(args: SelectSubset<T, TagUpdateArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {TagDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TagDeleteManyArgs>(args?: SelectSubset<T, TagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TagUpdateManyArgs>(args: SelectSubset<T, TagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags and returns the data updated in the database.
     * @param {TagUpdateManyAndReturnArgs} args - Arguments to update many Tags.
     * @example
     * // Update many Tags
     * const tag = await prisma.tag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tags and only return the `id`
     * const tagWithIdOnly = await prisma.tag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TagUpdateManyAndReturnArgs>(args: SelectSubset<T, TagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tag.
     * @param {TagUpsertArgs} args - Arguments to update or create a Tag.
     * @example
     * // Update or create a Tag
     * const tag = await prisma.tag.upsert({
     *   create: {
     *     // ... data to create a Tag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tag we want to update
     *   }
     * })
     */
    upsert<T extends TagUpsertArgs>(args: SelectSubset<T, TagUpsertArgs<ExtArgs>>): Prisma__TagClient<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tag.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends TagCountArgs>(
      args?: Subset<T, TagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagAggregateArgs>(args: Subset<T, TagAggregateArgs>): Prisma.PrismaPromise<GetTagAggregateType<T>>

    /**
     * Group by Tag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TagGroupByArgs['orderBy'] }
        : { orderBy?: TagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tag model
   */
  readonly fields: TagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends Tag$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Tag$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tag model
   */
  interface TagFieldRefs {
    readonly id: FieldRef<"Tag", 'String'>
    readonly userId: FieldRef<"Tag", 'String'>
    readonly name: FieldRef<"Tag", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tag findUnique
   */
  export type TagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findUniqueOrThrow
   */
  export type TagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag findFirst
   */
  export type TagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findFirstOrThrow
   */
  export type TagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tag to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tags.
     */
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag findMany
   */
  export type TagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter, which Tags to fetch.
     */
    where?: TagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tags to fetch.
     */
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tags.
     */
    cursor?: TagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tags.
     */
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Tag create
   */
  export type TagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to create a Tag.
     */
    data: XOR<TagCreateInput, TagUncheckedCreateInput>
  }

  /**
   * Tag createMany
   */
  export type TagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag createManyAndReturn
   */
  export type TagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to create many Tags.
     */
    data: TagCreateManyInput | TagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tag update
   */
  export type TagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The data needed to update a Tag.
     */
    data: XOR<TagUpdateInput, TagUncheckedUpdateInput>
    /**
     * Choose, which Tag to update.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag updateMany
   */
  export type TagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag updateManyAndReturn
   */
  export type TagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * The data used to update Tags.
     */
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyInput>
    /**
     * Filter which Tags to update
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to update.
     */
    limit?: number
  }

  /**
   * Tag upsert
   */
  export type TagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * The filter to search for the Tag to update in case it exists.
     */
    where: TagWhereUniqueInput
    /**
     * In case the Tag found by the `where` argument doesn't exist, create a new Tag with this data.
     */
    create: XOR<TagCreateInput, TagUncheckedCreateInput>
    /**
     * In case the Tag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TagUpdateInput, TagUncheckedUpdateInput>
  }

  /**
   * Tag delete
   */
  export type TagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    /**
     * Filter which Tag to delete.
     */
    where: TagWhereUniqueInput
  }

  /**
   * Tag deleteMany
   */
  export type TagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tags to delete
     */
    where?: TagWhereInput
    /**
     * Limit how many Tags to delete.
     */
    limit?: number
  }

  /**
   * Tag.sessions
   */
  export type Tag$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Tag without action
   */
  export type TagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
  }


  /**
   * Model Recording
   */

  export type AggregateRecording = {
    _count: RecordingCountAggregateOutputType | null
    _min: RecordingMinAggregateOutputType | null
    _max: RecordingMaxAggregateOutputType | null
  }

  export type RecordingMinAggregateOutputType = {
    id: string | null
    sessionId: string | null
    url: string | null
    label: string | null
    createdAt: Date | null
  }

  export type RecordingMaxAggregateOutputType = {
    id: string | null
    sessionId: string | null
    url: string | null
    label: string | null
    createdAt: Date | null
  }

  export type RecordingCountAggregateOutputType = {
    id: number
    sessionId: number
    url: number
    label: number
    createdAt: number
    _all: number
  }


  export type RecordingMinAggregateInputType = {
    id?: true
    sessionId?: true
    url?: true
    label?: true
    createdAt?: true
  }

  export type RecordingMaxAggregateInputType = {
    id?: true
    sessionId?: true
    url?: true
    label?: true
    createdAt?: true
  }

  export type RecordingCountAggregateInputType = {
    id?: true
    sessionId?: true
    url?: true
    label?: true
    createdAt?: true
    _all?: true
  }

  export type RecordingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recording to aggregate.
     */
    where?: RecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recordings to fetch.
     */
    orderBy?: RecordingOrderByWithRelationInput | RecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recordings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Recordings
    **/
    _count?: true | RecordingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RecordingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RecordingMaxAggregateInputType
  }

  export type GetRecordingAggregateType<T extends RecordingAggregateArgs> = {
        [P in keyof T & keyof AggregateRecording]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRecording[P]>
      : GetScalarType<T[P], AggregateRecording[P]>
  }




  export type RecordingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RecordingWhereInput
    orderBy?: RecordingOrderByWithAggregationInput | RecordingOrderByWithAggregationInput[]
    by: RecordingScalarFieldEnum[] | RecordingScalarFieldEnum
    having?: RecordingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RecordingCountAggregateInputType | true
    _min?: RecordingMinAggregateInputType
    _max?: RecordingMaxAggregateInputType
  }

  export type RecordingGroupByOutputType = {
    id: string
    sessionId: string
    url: string
    label: string | null
    createdAt: Date
    _count: RecordingCountAggregateOutputType | null
    _min: RecordingMinAggregateOutputType | null
    _max: RecordingMaxAggregateOutputType | null
  }

  type GetRecordingGroupByPayload<T extends RecordingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RecordingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RecordingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RecordingGroupByOutputType[P]>
            : GetScalarType<T[P], RecordingGroupByOutputType[P]>
        }
      >
    >


  export type RecordingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    url?: boolean
    label?: boolean
    createdAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recording"]>

  export type RecordingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    url?: boolean
    label?: boolean
    createdAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recording"]>

  export type RecordingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    url?: boolean
    label?: boolean
    createdAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["recording"]>

  export type RecordingSelectScalar = {
    id?: boolean
    sessionId?: boolean
    url?: boolean
    label?: boolean
    createdAt?: boolean
  }

  export type RecordingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "url" | "label" | "createdAt", ExtArgs["result"]["recording"]>
  export type RecordingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type RecordingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }
  export type RecordingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
  }

  export type $RecordingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Recording"
    objects: {
      session: Prisma.$SessionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionId: string
      url: string
      label: string | null
      createdAt: Date
    }, ExtArgs["result"]["recording"]>
    composites: {}
  }

  type RecordingGetPayload<S extends boolean | null | undefined | RecordingDefaultArgs> = $Result.GetResult<Prisma.$RecordingPayload, S>

  type RecordingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RecordingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RecordingCountAggregateInputType | true
    }

  export interface RecordingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Recording'], meta: { name: 'Recording' } }
    /**
     * Find zero or one Recording that matches the filter.
     * @param {RecordingFindUniqueArgs} args - Arguments to find a Recording
     * @example
     * // Get one Recording
     * const recording = await prisma.recording.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RecordingFindUniqueArgs>(args: SelectSubset<T, RecordingFindUniqueArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Recording that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RecordingFindUniqueOrThrowArgs} args - Arguments to find a Recording
     * @example
     * // Get one Recording
     * const recording = await prisma.recording.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RecordingFindUniqueOrThrowArgs>(args: SelectSubset<T, RecordingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recording that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingFindFirstArgs} args - Arguments to find a Recording
     * @example
     * // Get one Recording
     * const recording = await prisma.recording.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RecordingFindFirstArgs>(args?: SelectSubset<T, RecordingFindFirstArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Recording that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingFindFirstOrThrowArgs} args - Arguments to find a Recording
     * @example
     * // Get one Recording
     * const recording = await prisma.recording.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RecordingFindFirstOrThrowArgs>(args?: SelectSubset<T, RecordingFindFirstOrThrowArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Recordings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Recordings
     * const recordings = await prisma.recording.findMany()
     * 
     * // Get first 10 Recordings
     * const recordings = await prisma.recording.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const recordingWithIdOnly = await prisma.recording.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RecordingFindManyArgs>(args?: SelectSubset<T, RecordingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Recording.
     * @param {RecordingCreateArgs} args - Arguments to create a Recording.
     * @example
     * // Create one Recording
     * const Recording = await prisma.recording.create({
     *   data: {
     *     // ... data to create a Recording
     *   }
     * })
     * 
     */
    create<T extends RecordingCreateArgs>(args: SelectSubset<T, RecordingCreateArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Recordings.
     * @param {RecordingCreateManyArgs} args - Arguments to create many Recordings.
     * @example
     * // Create many Recordings
     * const recording = await prisma.recording.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RecordingCreateManyArgs>(args?: SelectSubset<T, RecordingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Recordings and returns the data saved in the database.
     * @param {RecordingCreateManyAndReturnArgs} args - Arguments to create many Recordings.
     * @example
     * // Create many Recordings
     * const recording = await prisma.recording.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Recordings and only return the `id`
     * const recordingWithIdOnly = await prisma.recording.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RecordingCreateManyAndReturnArgs>(args?: SelectSubset<T, RecordingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Recording.
     * @param {RecordingDeleteArgs} args - Arguments to delete one Recording.
     * @example
     * // Delete one Recording
     * const Recording = await prisma.recording.delete({
     *   where: {
     *     // ... filter to delete one Recording
     *   }
     * })
     * 
     */
    delete<T extends RecordingDeleteArgs>(args: SelectSubset<T, RecordingDeleteArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Recording.
     * @param {RecordingUpdateArgs} args - Arguments to update one Recording.
     * @example
     * // Update one Recording
     * const recording = await prisma.recording.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RecordingUpdateArgs>(args: SelectSubset<T, RecordingUpdateArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Recordings.
     * @param {RecordingDeleteManyArgs} args - Arguments to filter Recordings to delete.
     * @example
     * // Delete a few Recordings
     * const { count } = await prisma.recording.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RecordingDeleteManyArgs>(args?: SelectSubset<T, RecordingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recordings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Recordings
     * const recording = await prisma.recording.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RecordingUpdateManyArgs>(args: SelectSubset<T, RecordingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Recordings and returns the data updated in the database.
     * @param {RecordingUpdateManyAndReturnArgs} args - Arguments to update many Recordings.
     * @example
     * // Update many Recordings
     * const recording = await prisma.recording.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Recordings and only return the `id`
     * const recordingWithIdOnly = await prisma.recording.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RecordingUpdateManyAndReturnArgs>(args: SelectSubset<T, RecordingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Recording.
     * @param {RecordingUpsertArgs} args - Arguments to update or create a Recording.
     * @example
     * // Update or create a Recording
     * const recording = await prisma.recording.upsert({
     *   create: {
     *     // ... data to create a Recording
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Recording we want to update
     *   }
     * })
     */
    upsert<T extends RecordingUpsertArgs>(args: SelectSubset<T, RecordingUpsertArgs<ExtArgs>>): Prisma__RecordingClient<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Recordings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingCountArgs} args - Arguments to filter Recordings to count.
     * @example
     * // Count the number of Recordings
     * const count = await prisma.recording.count({
     *   where: {
     *     // ... the filter for the Recordings we want to count
     *   }
     * })
    **/
    count<T extends RecordingCountArgs>(
      args?: Subset<T, RecordingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RecordingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Recording.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RecordingAggregateArgs>(args: Subset<T, RecordingAggregateArgs>): Prisma.PrismaPromise<GetRecordingAggregateType<T>>

    /**
     * Group by Recording.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RecordingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RecordingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RecordingGroupByArgs['orderBy'] }
        : { orderBy?: RecordingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RecordingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRecordingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Recording model
   */
  readonly fields: RecordingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Recording.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RecordingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends SessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionDefaultArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Recording model
   */
  interface RecordingFieldRefs {
    readonly id: FieldRef<"Recording", 'String'>
    readonly sessionId: FieldRef<"Recording", 'String'>
    readonly url: FieldRef<"Recording", 'String'>
    readonly label: FieldRef<"Recording", 'String'>
    readonly createdAt: FieldRef<"Recording", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Recording findUnique
   */
  export type RecordingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recording
     */
    omit?: RecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * Filter, which Recording to fetch.
     */
    where: RecordingWhereUniqueInput
  }

  /**
   * Recording findUniqueOrThrow
   */
  export type RecordingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recording
     */
    omit?: RecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * Filter, which Recording to fetch.
     */
    where: RecordingWhereUniqueInput
  }

  /**
   * Recording findFirst
   */
  export type RecordingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recording
     */
    omit?: RecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * Filter, which Recording to fetch.
     */
    where?: RecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recordings to fetch.
     */
    orderBy?: RecordingOrderByWithRelationInput | RecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recordings.
     */
    cursor?: RecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recordings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recordings.
     */
    distinct?: RecordingScalarFieldEnum | RecordingScalarFieldEnum[]
  }

  /**
   * Recording findFirstOrThrow
   */
  export type RecordingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recording
     */
    omit?: RecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * Filter, which Recording to fetch.
     */
    where?: RecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recordings to fetch.
     */
    orderBy?: RecordingOrderByWithRelationInput | RecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Recordings.
     */
    cursor?: RecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recordings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Recordings.
     */
    distinct?: RecordingScalarFieldEnum | RecordingScalarFieldEnum[]
  }

  /**
   * Recording findMany
   */
  export type RecordingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recording
     */
    omit?: RecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * Filter, which Recordings to fetch.
     */
    where?: RecordingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Recordings to fetch.
     */
    orderBy?: RecordingOrderByWithRelationInput | RecordingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Recordings.
     */
    cursor?: RecordingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Recordings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Recordings.
     */
    skip?: number
    distinct?: RecordingScalarFieldEnum | RecordingScalarFieldEnum[]
  }

  /**
   * Recording create
   */
  export type RecordingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recording
     */
    omit?: RecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * The data needed to create a Recording.
     */
    data: XOR<RecordingCreateInput, RecordingUncheckedCreateInput>
  }

  /**
   * Recording createMany
   */
  export type RecordingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Recordings.
     */
    data: RecordingCreateManyInput | RecordingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Recording createManyAndReturn
   */
  export type RecordingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recording
     */
    omit?: RecordingOmit<ExtArgs> | null
    /**
     * The data used to create many Recordings.
     */
    data: RecordingCreateManyInput | RecordingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recording update
   */
  export type RecordingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recording
     */
    omit?: RecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * The data needed to update a Recording.
     */
    data: XOR<RecordingUpdateInput, RecordingUncheckedUpdateInput>
    /**
     * Choose, which Recording to update.
     */
    where: RecordingWhereUniqueInput
  }

  /**
   * Recording updateMany
   */
  export type RecordingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Recordings.
     */
    data: XOR<RecordingUpdateManyMutationInput, RecordingUncheckedUpdateManyInput>
    /**
     * Filter which Recordings to update
     */
    where?: RecordingWhereInput
    /**
     * Limit how many Recordings to update.
     */
    limit?: number
  }

  /**
   * Recording updateManyAndReturn
   */
  export type RecordingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Recording
     */
    omit?: RecordingOmit<ExtArgs> | null
    /**
     * The data used to update Recordings.
     */
    data: XOR<RecordingUpdateManyMutationInput, RecordingUncheckedUpdateManyInput>
    /**
     * Filter which Recordings to update
     */
    where?: RecordingWhereInput
    /**
     * Limit how many Recordings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Recording upsert
   */
  export type RecordingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recording
     */
    omit?: RecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * The filter to search for the Recording to update in case it exists.
     */
    where: RecordingWhereUniqueInput
    /**
     * In case the Recording found by the `where` argument doesn't exist, create a new Recording with this data.
     */
    create: XOR<RecordingCreateInput, RecordingUncheckedCreateInput>
    /**
     * In case the Recording was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RecordingUpdateInput, RecordingUncheckedUpdateInput>
  }

  /**
   * Recording delete
   */
  export type RecordingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recording
     */
    omit?: RecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    /**
     * Filter which Recording to delete.
     */
    where: RecordingWhereUniqueInput
  }

  /**
   * Recording deleteMany
   */
  export type RecordingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Recordings to delete
     */
    where?: RecordingWhereInput
    /**
     * Limit how many Recordings to delete.
     */
    limit?: number
  }

  /**
   * Recording without action
   */
  export type RecordingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recording
     */
    omit?: RecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
  }


  /**
   * Model Instructor
   */

  export type AggregateInstructor = {
    _count: InstructorCountAggregateOutputType | null
    _min: InstructorMinAggregateOutputType | null
    _max: InstructorMaxAggregateOutputType | null
  }

  export type InstructorMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type InstructorMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type InstructorCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    createdAt: number
    _all: number
  }


  export type InstructorMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    createdAt?: true
  }

  export type InstructorMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    createdAt?: true
  }

  export type InstructorCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type InstructorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Instructor to aggregate.
     */
    where?: InstructorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instructors to fetch.
     */
    orderBy?: InstructorOrderByWithRelationInput | InstructorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InstructorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instructors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instructors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Instructors
    **/
    _count?: true | InstructorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstructorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstructorMaxAggregateInputType
  }

  export type GetInstructorAggregateType<T extends InstructorAggregateArgs> = {
        [P in keyof T & keyof AggregateInstructor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstructor[P]>
      : GetScalarType<T[P], AggregateInstructor[P]>
  }




  export type InstructorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstructorWhereInput
    orderBy?: InstructorOrderByWithAggregationInput | InstructorOrderByWithAggregationInput[]
    by: InstructorScalarFieldEnum[] | InstructorScalarFieldEnum
    having?: InstructorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstructorCountAggregateInputType | true
    _min?: InstructorMinAggregateInputType
    _max?: InstructorMaxAggregateInputType
  }

  export type InstructorGroupByOutputType = {
    id: string
    userId: string
    name: string
    createdAt: Date
    _count: InstructorCountAggregateOutputType | null
    _min: InstructorMinAggregateOutputType | null
    _max: InstructorMaxAggregateOutputType | null
  }

  type GetInstructorGroupByPayload<T extends InstructorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InstructorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstructorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstructorGroupByOutputType[P]>
            : GetScalarType<T[P], InstructorGroupByOutputType[P]>
        }
      >
    >


  export type InstructorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
    sessions?: boolean | Instructor$sessionsArgs<ExtArgs>
    _count?: boolean | InstructorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["instructor"]>

  export type InstructorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["instructor"]>

  export type InstructorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["instructor"]>

  export type InstructorSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type InstructorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "createdAt", ExtArgs["result"]["instructor"]>
  export type InstructorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | Instructor$sessionsArgs<ExtArgs>
    _count?: boolean | InstructorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InstructorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type InstructorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $InstructorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Instructor"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["instructor"]>
    composites: {}
  }

  type InstructorGetPayload<S extends boolean | null | undefined | InstructorDefaultArgs> = $Result.GetResult<Prisma.$InstructorPayload, S>

  type InstructorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InstructorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InstructorCountAggregateInputType | true
    }

  export interface InstructorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Instructor'], meta: { name: 'Instructor' } }
    /**
     * Find zero or one Instructor that matches the filter.
     * @param {InstructorFindUniqueArgs} args - Arguments to find a Instructor
     * @example
     * // Get one Instructor
     * const instructor = await prisma.instructor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstructorFindUniqueArgs>(args: SelectSubset<T, InstructorFindUniqueArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Instructor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InstructorFindUniqueOrThrowArgs} args - Arguments to find a Instructor
     * @example
     * // Get one Instructor
     * const instructor = await prisma.instructor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstructorFindUniqueOrThrowArgs>(args: SelectSubset<T, InstructorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Instructor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorFindFirstArgs} args - Arguments to find a Instructor
     * @example
     * // Get one Instructor
     * const instructor = await prisma.instructor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstructorFindFirstArgs>(args?: SelectSubset<T, InstructorFindFirstArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Instructor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorFindFirstOrThrowArgs} args - Arguments to find a Instructor
     * @example
     * // Get one Instructor
     * const instructor = await prisma.instructor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstructorFindFirstOrThrowArgs>(args?: SelectSubset<T, InstructorFindFirstOrThrowArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Instructors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Instructors
     * const instructors = await prisma.instructor.findMany()
     * 
     * // Get first 10 Instructors
     * const instructors = await prisma.instructor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const instructorWithIdOnly = await prisma.instructor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InstructorFindManyArgs>(args?: SelectSubset<T, InstructorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Instructor.
     * @param {InstructorCreateArgs} args - Arguments to create a Instructor.
     * @example
     * // Create one Instructor
     * const Instructor = await prisma.instructor.create({
     *   data: {
     *     // ... data to create a Instructor
     *   }
     * })
     * 
     */
    create<T extends InstructorCreateArgs>(args: SelectSubset<T, InstructorCreateArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Instructors.
     * @param {InstructorCreateManyArgs} args - Arguments to create many Instructors.
     * @example
     * // Create many Instructors
     * const instructor = await prisma.instructor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InstructorCreateManyArgs>(args?: SelectSubset<T, InstructorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Instructors and returns the data saved in the database.
     * @param {InstructorCreateManyAndReturnArgs} args - Arguments to create many Instructors.
     * @example
     * // Create many Instructors
     * const instructor = await prisma.instructor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Instructors and only return the `id`
     * const instructorWithIdOnly = await prisma.instructor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InstructorCreateManyAndReturnArgs>(args?: SelectSubset<T, InstructorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Instructor.
     * @param {InstructorDeleteArgs} args - Arguments to delete one Instructor.
     * @example
     * // Delete one Instructor
     * const Instructor = await prisma.instructor.delete({
     *   where: {
     *     // ... filter to delete one Instructor
     *   }
     * })
     * 
     */
    delete<T extends InstructorDeleteArgs>(args: SelectSubset<T, InstructorDeleteArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Instructor.
     * @param {InstructorUpdateArgs} args - Arguments to update one Instructor.
     * @example
     * // Update one Instructor
     * const instructor = await prisma.instructor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InstructorUpdateArgs>(args: SelectSubset<T, InstructorUpdateArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Instructors.
     * @param {InstructorDeleteManyArgs} args - Arguments to filter Instructors to delete.
     * @example
     * // Delete a few Instructors
     * const { count } = await prisma.instructor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InstructorDeleteManyArgs>(args?: SelectSubset<T, InstructorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Instructors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Instructors
     * const instructor = await prisma.instructor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InstructorUpdateManyArgs>(args: SelectSubset<T, InstructorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Instructors and returns the data updated in the database.
     * @param {InstructorUpdateManyAndReturnArgs} args - Arguments to update many Instructors.
     * @example
     * // Update many Instructors
     * const instructor = await prisma.instructor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Instructors and only return the `id`
     * const instructorWithIdOnly = await prisma.instructor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InstructorUpdateManyAndReturnArgs>(args: SelectSubset<T, InstructorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Instructor.
     * @param {InstructorUpsertArgs} args - Arguments to update or create a Instructor.
     * @example
     * // Update or create a Instructor
     * const instructor = await prisma.instructor.upsert({
     *   create: {
     *     // ... data to create a Instructor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Instructor we want to update
     *   }
     * })
     */
    upsert<T extends InstructorUpsertArgs>(args: SelectSubset<T, InstructorUpsertArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Instructors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorCountArgs} args - Arguments to filter Instructors to count.
     * @example
     * // Count the number of Instructors
     * const count = await prisma.instructor.count({
     *   where: {
     *     // ... the filter for the Instructors we want to count
     *   }
     * })
    **/
    count<T extends InstructorCountArgs>(
      args?: Subset<T, InstructorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstructorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Instructor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstructorAggregateArgs>(args: Subset<T, InstructorAggregateArgs>): Prisma.PrismaPromise<GetInstructorAggregateType<T>>

    /**
     * Group by Instructor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstructorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InstructorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstructorGroupByArgs['orderBy'] }
        : { orderBy?: InstructorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InstructorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstructorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Instructor model
   */
  readonly fields: InstructorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Instructor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InstructorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends Instructor$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Instructor$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Instructor model
   */
  interface InstructorFieldRefs {
    readonly id: FieldRef<"Instructor", 'String'>
    readonly userId: FieldRef<"Instructor", 'String'>
    readonly name: FieldRef<"Instructor", 'String'>
    readonly createdAt: FieldRef<"Instructor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Instructor findUnique
   */
  export type InstructorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * Filter, which Instructor to fetch.
     */
    where: InstructorWhereUniqueInput
  }

  /**
   * Instructor findUniqueOrThrow
   */
  export type InstructorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * Filter, which Instructor to fetch.
     */
    where: InstructorWhereUniqueInput
  }

  /**
   * Instructor findFirst
   */
  export type InstructorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * Filter, which Instructor to fetch.
     */
    where?: InstructorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instructors to fetch.
     */
    orderBy?: InstructorOrderByWithRelationInput | InstructorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Instructors.
     */
    cursor?: InstructorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instructors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instructors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Instructors.
     */
    distinct?: InstructorScalarFieldEnum | InstructorScalarFieldEnum[]
  }

  /**
   * Instructor findFirstOrThrow
   */
  export type InstructorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * Filter, which Instructor to fetch.
     */
    where?: InstructorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instructors to fetch.
     */
    orderBy?: InstructorOrderByWithRelationInput | InstructorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Instructors.
     */
    cursor?: InstructorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instructors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instructors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Instructors.
     */
    distinct?: InstructorScalarFieldEnum | InstructorScalarFieldEnum[]
  }

  /**
   * Instructor findMany
   */
  export type InstructorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * Filter, which Instructors to fetch.
     */
    where?: InstructorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instructors to fetch.
     */
    orderBy?: InstructorOrderByWithRelationInput | InstructorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Instructors.
     */
    cursor?: InstructorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instructors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instructors.
     */
    skip?: number
    distinct?: InstructorScalarFieldEnum | InstructorScalarFieldEnum[]
  }

  /**
   * Instructor create
   */
  export type InstructorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * The data needed to create a Instructor.
     */
    data: XOR<InstructorCreateInput, InstructorUncheckedCreateInput>
  }

  /**
   * Instructor createMany
   */
  export type InstructorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Instructors.
     */
    data: InstructorCreateManyInput | InstructorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Instructor createManyAndReturn
   */
  export type InstructorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * The data used to create many Instructors.
     */
    data: InstructorCreateManyInput | InstructorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Instructor update
   */
  export type InstructorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * The data needed to update a Instructor.
     */
    data: XOR<InstructorUpdateInput, InstructorUncheckedUpdateInput>
    /**
     * Choose, which Instructor to update.
     */
    where: InstructorWhereUniqueInput
  }

  /**
   * Instructor updateMany
   */
  export type InstructorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Instructors.
     */
    data: XOR<InstructorUpdateManyMutationInput, InstructorUncheckedUpdateManyInput>
    /**
     * Filter which Instructors to update
     */
    where?: InstructorWhereInput
    /**
     * Limit how many Instructors to update.
     */
    limit?: number
  }

  /**
   * Instructor updateManyAndReturn
   */
  export type InstructorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * The data used to update Instructors.
     */
    data: XOR<InstructorUpdateManyMutationInput, InstructorUncheckedUpdateManyInput>
    /**
     * Filter which Instructors to update
     */
    where?: InstructorWhereInput
    /**
     * Limit how many Instructors to update.
     */
    limit?: number
  }

  /**
   * Instructor upsert
   */
  export type InstructorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * The filter to search for the Instructor to update in case it exists.
     */
    where: InstructorWhereUniqueInput
    /**
     * In case the Instructor found by the `where` argument doesn't exist, create a new Instructor with this data.
     */
    create: XOR<InstructorCreateInput, InstructorUncheckedCreateInput>
    /**
     * In case the Instructor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstructorUpdateInput, InstructorUncheckedUpdateInput>
  }

  /**
   * Instructor delete
   */
  export type InstructorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    /**
     * Filter which Instructor to delete.
     */
    where: InstructorWhereUniqueInput
  }

  /**
   * Instructor deleteMany
   */
  export type InstructorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Instructors to delete
     */
    where?: InstructorWhereInput
    /**
     * Limit how many Instructors to delete.
     */
    limit?: number
  }

  /**
   * Instructor.sessions
   */
  export type Instructor$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Instructor without action
   */
  export type InstructorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
  }


  /**
   * Model Goal
   */

  export type AggregateGoal = {
    _count: GoalCountAggregateOutputType | null
    _min: GoalMinAggregateOutputType | null
    _max: GoalMaxAggregateOutputType | null
  }

  export type GoalMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type GoalMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    createdAt: Date | null
  }

  export type GoalCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    createdAt: number
    _all: number
  }


  export type GoalMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    createdAt?: true
  }

  export type GoalMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    createdAt?: true
  }

  export type GoalCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    createdAt?: true
    _all?: true
  }

  export type GoalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goal to aggregate.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Goals
    **/
    _count?: true | GoalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GoalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GoalMaxAggregateInputType
  }

  export type GetGoalAggregateType<T extends GoalAggregateArgs> = {
        [P in keyof T & keyof AggregateGoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGoal[P]>
      : GetScalarType<T[P], AggregateGoal[P]>
  }




  export type GoalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GoalWhereInput
    orderBy?: GoalOrderByWithAggregationInput | GoalOrderByWithAggregationInput[]
    by: GoalScalarFieldEnum[] | GoalScalarFieldEnum
    having?: GoalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GoalCountAggregateInputType | true
    _min?: GoalMinAggregateInputType
    _max?: GoalMaxAggregateInputType
  }

  export type GoalGroupByOutputType = {
    id: string
    userId: string
    name: string
    createdAt: Date
    _count: GoalCountAggregateOutputType | null
    _min: GoalMinAggregateOutputType | null
    _max: GoalMaxAggregateOutputType | null
  }

  type GetGoalGroupByPayload<T extends GoalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GoalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GoalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GoalGroupByOutputType[P]>
            : GetScalarType<T[P], GoalGroupByOutputType[P]>
        }
      >
    >


  export type GoalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
    sessions?: boolean | Goal$sessionsArgs<ExtArgs>
    _count?: boolean | GoalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["goal"]>

  export type GoalSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    createdAt?: boolean
  }

  export type GoalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "createdAt", ExtArgs["result"]["goal"]>
  export type GoalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | Goal$sessionsArgs<ExtArgs>
    _count?: boolean | GoalCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GoalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GoalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GoalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Goal"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      createdAt: Date
    }, ExtArgs["result"]["goal"]>
    composites: {}
  }

  type GoalGetPayload<S extends boolean | null | undefined | GoalDefaultArgs> = $Result.GetResult<Prisma.$GoalPayload, S>

  type GoalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GoalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GoalCountAggregateInputType | true
    }

  export interface GoalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Goal'], meta: { name: 'Goal' } }
    /**
     * Find zero or one Goal that matches the filter.
     * @param {GoalFindUniqueArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GoalFindUniqueArgs>(args: SelectSubset<T, GoalFindUniqueArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Goal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GoalFindUniqueOrThrowArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GoalFindUniqueOrThrowArgs>(args: SelectSubset<T, GoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Goal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindFirstArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GoalFindFirstArgs>(args?: SelectSubset<T, GoalFindFirstArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Goal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindFirstOrThrowArgs} args - Arguments to find a Goal
     * @example
     * // Get one Goal
     * const goal = await prisma.goal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GoalFindFirstOrThrowArgs>(args?: SelectSubset<T, GoalFindFirstOrThrowArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Goals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Goals
     * const goals = await prisma.goal.findMany()
     * 
     * // Get first 10 Goals
     * const goals = await prisma.goal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const goalWithIdOnly = await prisma.goal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GoalFindManyArgs>(args?: SelectSubset<T, GoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Goal.
     * @param {GoalCreateArgs} args - Arguments to create a Goal.
     * @example
     * // Create one Goal
     * const Goal = await prisma.goal.create({
     *   data: {
     *     // ... data to create a Goal
     *   }
     * })
     * 
     */
    create<T extends GoalCreateArgs>(args: SelectSubset<T, GoalCreateArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Goals.
     * @param {GoalCreateManyArgs} args - Arguments to create many Goals.
     * @example
     * // Create many Goals
     * const goal = await prisma.goal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GoalCreateManyArgs>(args?: SelectSubset<T, GoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Goals and returns the data saved in the database.
     * @param {GoalCreateManyAndReturnArgs} args - Arguments to create many Goals.
     * @example
     * // Create many Goals
     * const goal = await prisma.goal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Goals and only return the `id`
     * const goalWithIdOnly = await prisma.goal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GoalCreateManyAndReturnArgs>(args?: SelectSubset<T, GoalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Goal.
     * @param {GoalDeleteArgs} args - Arguments to delete one Goal.
     * @example
     * // Delete one Goal
     * const Goal = await prisma.goal.delete({
     *   where: {
     *     // ... filter to delete one Goal
     *   }
     * })
     * 
     */
    delete<T extends GoalDeleteArgs>(args: SelectSubset<T, GoalDeleteArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Goal.
     * @param {GoalUpdateArgs} args - Arguments to update one Goal.
     * @example
     * // Update one Goal
     * const goal = await prisma.goal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GoalUpdateArgs>(args: SelectSubset<T, GoalUpdateArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Goals.
     * @param {GoalDeleteManyArgs} args - Arguments to filter Goals to delete.
     * @example
     * // Delete a few Goals
     * const { count } = await prisma.goal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GoalDeleteManyArgs>(args?: SelectSubset<T, GoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Goals
     * const goal = await prisma.goal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GoalUpdateManyArgs>(args: SelectSubset<T, GoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Goals and returns the data updated in the database.
     * @param {GoalUpdateManyAndReturnArgs} args - Arguments to update many Goals.
     * @example
     * // Update many Goals
     * const goal = await prisma.goal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Goals and only return the `id`
     * const goalWithIdOnly = await prisma.goal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GoalUpdateManyAndReturnArgs>(args: SelectSubset<T, GoalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Goal.
     * @param {GoalUpsertArgs} args - Arguments to update or create a Goal.
     * @example
     * // Update or create a Goal
     * const goal = await prisma.goal.upsert({
     *   create: {
     *     // ... data to create a Goal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Goal we want to update
     *   }
     * })
     */
    upsert<T extends GoalUpsertArgs>(args: SelectSubset<T, GoalUpsertArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Goals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalCountArgs} args - Arguments to filter Goals to count.
     * @example
     * // Count the number of Goals
     * const count = await prisma.goal.count({
     *   where: {
     *     // ... the filter for the Goals we want to count
     *   }
     * })
    **/
    count<T extends GoalCountArgs>(
      args?: Subset<T, GoalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GoalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Goal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GoalAggregateArgs>(args: Subset<T, GoalAggregateArgs>): Prisma.PrismaPromise<GetGoalAggregateType<T>>

    /**
     * Group by Goal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GoalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GoalGroupByArgs['orderBy'] }
        : { orderBy?: GoalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Goal model
   */
  readonly fields: GoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Goal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GoalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends Goal$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Goal$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Goal model
   */
  interface GoalFieldRefs {
    readonly id: FieldRef<"Goal", 'String'>
    readonly userId: FieldRef<"Goal", 'String'>
    readonly name: FieldRef<"Goal", 'String'>
    readonly createdAt: FieldRef<"Goal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Goal findUnique
   */
  export type GoalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal findUniqueOrThrow
   */
  export type GoalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal findFirst
   */
  export type GoalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goals.
     */
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal findFirstOrThrow
   */
  export type GoalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goal to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Goals.
     */
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal findMany
   */
  export type GoalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter, which Goals to fetch.
     */
    where?: GoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Goals to fetch.
     */
    orderBy?: GoalOrderByWithRelationInput | GoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Goals.
     */
    cursor?: GoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Goals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Goals.
     */
    skip?: number
    distinct?: GoalScalarFieldEnum | GoalScalarFieldEnum[]
  }

  /**
   * Goal create
   */
  export type GoalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * The data needed to create a Goal.
     */
    data: XOR<GoalCreateInput, GoalUncheckedCreateInput>
  }

  /**
   * Goal createMany
   */
  export type GoalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Goals.
     */
    data: GoalCreateManyInput | GoalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Goal createManyAndReturn
   */
  export type GoalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data used to create many Goals.
     */
    data: GoalCreateManyInput | GoalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Goal update
   */
  export type GoalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * The data needed to update a Goal.
     */
    data: XOR<GoalUpdateInput, GoalUncheckedUpdateInput>
    /**
     * Choose, which Goal to update.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal updateMany
   */
  export type GoalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Goals.
     */
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyInput>
    /**
     * Filter which Goals to update
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to update.
     */
    limit?: number
  }

  /**
   * Goal updateManyAndReturn
   */
  export type GoalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * The data used to update Goals.
     */
    data: XOR<GoalUpdateManyMutationInput, GoalUncheckedUpdateManyInput>
    /**
     * Filter which Goals to update
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to update.
     */
    limit?: number
  }

  /**
   * Goal upsert
   */
  export type GoalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * The filter to search for the Goal to update in case it exists.
     */
    where: GoalWhereUniqueInput
    /**
     * In case the Goal found by the `where` argument doesn't exist, create a new Goal with this data.
     */
    create: XOR<GoalCreateInput, GoalUncheckedCreateInput>
    /**
     * In case the Goal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GoalUpdateInput, GoalUncheckedUpdateInput>
  }

  /**
   * Goal delete
   */
  export type GoalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    /**
     * Filter which Goal to delete.
     */
    where: GoalWhereUniqueInput
  }

  /**
   * Goal deleteMany
   */
  export type GoalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Goals to delete
     */
    where?: GoalWhereInput
    /**
     * Limit how many Goals to delete.
     */
    limit?: number
  }

  /**
   * Goal.sessions
   */
  export type Goal$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Goal without action
   */
  export type GoalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
  }


  /**
   * Model SessionTemplate
   */

  export type AggregateSessionTemplate = {
    _count: SessionTemplateCountAggregateOutputType | null
    _min: SessionTemplateMinAggregateOutputType | null
    _max: SessionTemplateMaxAggregateOutputType | null
  }

  export type SessionTemplateMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    showMetronome: boolean | null
    showSongPicker: boolean | null
    showGoalPicker: boolean | null
    createdAt: Date | null
  }

  export type SessionTemplateMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    showMetronome: boolean | null
    showSongPicker: boolean | null
    showGoalPicker: boolean | null
    createdAt: Date | null
  }

  export type SessionTemplateCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    showMetronome: number
    showSongPicker: number
    showGoalPicker: number
    checklistItems: number
    createdAt: number
    _all: number
  }


  export type SessionTemplateMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    showMetronome?: true
    showSongPicker?: true
    showGoalPicker?: true
    createdAt?: true
  }

  export type SessionTemplateMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    showMetronome?: true
    showSongPicker?: true
    showGoalPicker?: true
    createdAt?: true
  }

  export type SessionTemplateCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    showMetronome?: true
    showSongPicker?: true
    showGoalPicker?: true
    checklistItems?: true
    createdAt?: true
    _all?: true
  }

  export type SessionTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SessionTemplate to aggregate.
     */
    where?: SessionTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionTemplates to fetch.
     */
    orderBy?: SessionTemplateOrderByWithRelationInput | SessionTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SessionTemplates
    **/
    _count?: true | SessionTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionTemplateMaxAggregateInputType
  }

  export type GetSessionTemplateAggregateType<T extends SessionTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateSessionTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSessionTemplate[P]>
      : GetScalarType<T[P], AggregateSessionTemplate[P]>
  }




  export type SessionTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionTemplateWhereInput
    orderBy?: SessionTemplateOrderByWithAggregationInput | SessionTemplateOrderByWithAggregationInput[]
    by: SessionTemplateScalarFieldEnum[] | SessionTemplateScalarFieldEnum
    having?: SessionTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionTemplateCountAggregateInputType | true
    _min?: SessionTemplateMinAggregateInputType
    _max?: SessionTemplateMaxAggregateInputType
  }

  export type SessionTemplateGroupByOutputType = {
    id: string
    userId: string
    name: string
    showMetronome: boolean
    showSongPicker: boolean
    showGoalPicker: boolean
    checklistItems: JsonValue | null
    createdAt: Date
    _count: SessionTemplateCountAggregateOutputType | null
    _min: SessionTemplateMinAggregateOutputType | null
    _max: SessionTemplateMaxAggregateOutputType | null
  }

  type GetSessionTemplateGroupByPayload<T extends SessionTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], SessionTemplateGroupByOutputType[P]>
        }
      >
    >


  export type SessionTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    showMetronome?: boolean
    showSongPicker?: boolean
    showGoalPicker?: boolean
    checklistItems?: boolean
    createdAt?: boolean
    sessions?: boolean | SessionTemplate$sessionsArgs<ExtArgs>
    _count?: boolean | SessionTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sessionTemplate"]>

  export type SessionTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    showMetronome?: boolean
    showSongPicker?: boolean
    showGoalPicker?: boolean
    checklistItems?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sessionTemplate"]>

  export type SessionTemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    showMetronome?: boolean
    showSongPicker?: boolean
    showGoalPicker?: boolean
    checklistItems?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["sessionTemplate"]>

  export type SessionTemplateSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    showMetronome?: boolean
    showSongPicker?: boolean
    showGoalPicker?: boolean
    checklistItems?: boolean
    createdAt?: boolean
  }

  export type SessionTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "showMetronome" | "showSongPicker" | "showGoalPicker" | "checklistItems" | "createdAt", ExtArgs["result"]["sessionTemplate"]>
  export type SessionTemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | SessionTemplate$sessionsArgs<ExtArgs>
    _count?: boolean | SessionTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SessionTemplateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SessionTemplateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SessionTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SessionTemplate"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      showMetronome: boolean
      showSongPicker: boolean
      showGoalPicker: boolean
      checklistItems: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["sessionTemplate"]>
    composites: {}
  }

  type SessionTemplateGetPayload<S extends boolean | null | undefined | SessionTemplateDefaultArgs> = $Result.GetResult<Prisma.$SessionTemplatePayload, S>

  type SessionTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionTemplateCountAggregateInputType | true
    }

  export interface SessionTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SessionTemplate'], meta: { name: 'SessionTemplate' } }
    /**
     * Find zero or one SessionTemplate that matches the filter.
     * @param {SessionTemplateFindUniqueArgs} args - Arguments to find a SessionTemplate
     * @example
     * // Get one SessionTemplate
     * const sessionTemplate = await prisma.sessionTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionTemplateFindUniqueArgs>(args: SelectSubset<T, SessionTemplateFindUniqueArgs<ExtArgs>>): Prisma__SessionTemplateClient<$Result.GetResult<Prisma.$SessionTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SessionTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionTemplateFindUniqueOrThrowArgs} args - Arguments to find a SessionTemplate
     * @example
     * // Get one SessionTemplate
     * const sessionTemplate = await prisma.sessionTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionTemplateClient<$Result.GetResult<Prisma.$SessionTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SessionTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionTemplateFindFirstArgs} args - Arguments to find a SessionTemplate
     * @example
     * // Get one SessionTemplate
     * const sessionTemplate = await prisma.sessionTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionTemplateFindFirstArgs>(args?: SelectSubset<T, SessionTemplateFindFirstArgs<ExtArgs>>): Prisma__SessionTemplateClient<$Result.GetResult<Prisma.$SessionTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SessionTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionTemplateFindFirstOrThrowArgs} args - Arguments to find a SessionTemplate
     * @example
     * // Get one SessionTemplate
     * const sessionTemplate = await prisma.sessionTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionTemplateClient<$Result.GetResult<Prisma.$SessionTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SessionTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SessionTemplates
     * const sessionTemplates = await prisma.sessionTemplate.findMany()
     * 
     * // Get first 10 SessionTemplates
     * const sessionTemplates = await prisma.sessionTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionTemplateWithIdOnly = await prisma.sessionTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionTemplateFindManyArgs>(args?: SelectSubset<T, SessionTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SessionTemplate.
     * @param {SessionTemplateCreateArgs} args - Arguments to create a SessionTemplate.
     * @example
     * // Create one SessionTemplate
     * const SessionTemplate = await prisma.sessionTemplate.create({
     *   data: {
     *     // ... data to create a SessionTemplate
     *   }
     * })
     * 
     */
    create<T extends SessionTemplateCreateArgs>(args: SelectSubset<T, SessionTemplateCreateArgs<ExtArgs>>): Prisma__SessionTemplateClient<$Result.GetResult<Prisma.$SessionTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SessionTemplates.
     * @param {SessionTemplateCreateManyArgs} args - Arguments to create many SessionTemplates.
     * @example
     * // Create many SessionTemplates
     * const sessionTemplate = await prisma.sessionTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionTemplateCreateManyArgs>(args?: SelectSubset<T, SessionTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SessionTemplates and returns the data saved in the database.
     * @param {SessionTemplateCreateManyAndReturnArgs} args - Arguments to create many SessionTemplates.
     * @example
     * // Create many SessionTemplates
     * const sessionTemplate = await prisma.sessionTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SessionTemplates and only return the `id`
     * const sessionTemplateWithIdOnly = await prisma.sessionTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SessionTemplate.
     * @param {SessionTemplateDeleteArgs} args - Arguments to delete one SessionTemplate.
     * @example
     * // Delete one SessionTemplate
     * const SessionTemplate = await prisma.sessionTemplate.delete({
     *   where: {
     *     // ... filter to delete one SessionTemplate
     *   }
     * })
     * 
     */
    delete<T extends SessionTemplateDeleteArgs>(args: SelectSubset<T, SessionTemplateDeleteArgs<ExtArgs>>): Prisma__SessionTemplateClient<$Result.GetResult<Prisma.$SessionTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SessionTemplate.
     * @param {SessionTemplateUpdateArgs} args - Arguments to update one SessionTemplate.
     * @example
     * // Update one SessionTemplate
     * const sessionTemplate = await prisma.sessionTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionTemplateUpdateArgs>(args: SelectSubset<T, SessionTemplateUpdateArgs<ExtArgs>>): Prisma__SessionTemplateClient<$Result.GetResult<Prisma.$SessionTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SessionTemplates.
     * @param {SessionTemplateDeleteManyArgs} args - Arguments to filter SessionTemplates to delete.
     * @example
     * // Delete a few SessionTemplates
     * const { count } = await prisma.sessionTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionTemplateDeleteManyArgs>(args?: SelectSubset<T, SessionTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SessionTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SessionTemplates
     * const sessionTemplate = await prisma.sessionTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionTemplateUpdateManyArgs>(args: SelectSubset<T, SessionTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SessionTemplates and returns the data updated in the database.
     * @param {SessionTemplateUpdateManyAndReturnArgs} args - Arguments to update many SessionTemplates.
     * @example
     * // Update many SessionTemplates
     * const sessionTemplate = await prisma.sessionTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SessionTemplates and only return the `id`
     * const sessionTemplateWithIdOnly = await prisma.sessionTemplate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionTemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SessionTemplate.
     * @param {SessionTemplateUpsertArgs} args - Arguments to update or create a SessionTemplate.
     * @example
     * // Update or create a SessionTemplate
     * const sessionTemplate = await prisma.sessionTemplate.upsert({
     *   create: {
     *     // ... data to create a SessionTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SessionTemplate we want to update
     *   }
     * })
     */
    upsert<T extends SessionTemplateUpsertArgs>(args: SelectSubset<T, SessionTemplateUpsertArgs<ExtArgs>>): Prisma__SessionTemplateClient<$Result.GetResult<Prisma.$SessionTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SessionTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionTemplateCountArgs} args - Arguments to filter SessionTemplates to count.
     * @example
     * // Count the number of SessionTemplates
     * const count = await prisma.sessionTemplate.count({
     *   where: {
     *     // ... the filter for the SessionTemplates we want to count
     *   }
     * })
    **/
    count<T extends SessionTemplateCountArgs>(
      args?: Subset<T, SessionTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SessionTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionTemplateAggregateArgs>(args: Subset<T, SessionTemplateAggregateArgs>): Prisma.PrismaPromise<GetSessionTemplateAggregateType<T>>

    /**
     * Group by SessionTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionTemplateGroupByArgs['orderBy'] }
        : { orderBy?: SessionTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SessionTemplate model
   */
  readonly fields: SessionTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SessionTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends SessionTemplate$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, SessionTemplate$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SessionTemplate model
   */
  interface SessionTemplateFieldRefs {
    readonly id: FieldRef<"SessionTemplate", 'String'>
    readonly userId: FieldRef<"SessionTemplate", 'String'>
    readonly name: FieldRef<"SessionTemplate", 'String'>
    readonly showMetronome: FieldRef<"SessionTemplate", 'Boolean'>
    readonly showSongPicker: FieldRef<"SessionTemplate", 'Boolean'>
    readonly showGoalPicker: FieldRef<"SessionTemplate", 'Boolean'>
    readonly checklistItems: FieldRef<"SessionTemplate", 'Json'>
    readonly createdAt: FieldRef<"SessionTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SessionTemplate findUnique
   */
  export type SessionTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionTemplate
     */
    select?: SessionTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionTemplate
     */
    omit?: SessionTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionTemplateInclude<ExtArgs> | null
    /**
     * Filter, which SessionTemplate to fetch.
     */
    where: SessionTemplateWhereUniqueInput
  }

  /**
   * SessionTemplate findUniqueOrThrow
   */
  export type SessionTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionTemplate
     */
    select?: SessionTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionTemplate
     */
    omit?: SessionTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionTemplateInclude<ExtArgs> | null
    /**
     * Filter, which SessionTemplate to fetch.
     */
    where: SessionTemplateWhereUniqueInput
  }

  /**
   * SessionTemplate findFirst
   */
  export type SessionTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionTemplate
     */
    select?: SessionTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionTemplate
     */
    omit?: SessionTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionTemplateInclude<ExtArgs> | null
    /**
     * Filter, which SessionTemplate to fetch.
     */
    where?: SessionTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionTemplates to fetch.
     */
    orderBy?: SessionTemplateOrderByWithRelationInput | SessionTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SessionTemplates.
     */
    cursor?: SessionTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SessionTemplates.
     */
    distinct?: SessionTemplateScalarFieldEnum | SessionTemplateScalarFieldEnum[]
  }

  /**
   * SessionTemplate findFirstOrThrow
   */
  export type SessionTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionTemplate
     */
    select?: SessionTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionTemplate
     */
    omit?: SessionTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionTemplateInclude<ExtArgs> | null
    /**
     * Filter, which SessionTemplate to fetch.
     */
    where?: SessionTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionTemplates to fetch.
     */
    orderBy?: SessionTemplateOrderByWithRelationInput | SessionTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SessionTemplates.
     */
    cursor?: SessionTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SessionTemplates.
     */
    distinct?: SessionTemplateScalarFieldEnum | SessionTemplateScalarFieldEnum[]
  }

  /**
   * SessionTemplate findMany
   */
  export type SessionTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionTemplate
     */
    select?: SessionTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionTemplate
     */
    omit?: SessionTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionTemplateInclude<ExtArgs> | null
    /**
     * Filter, which SessionTemplates to fetch.
     */
    where?: SessionTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SessionTemplates to fetch.
     */
    orderBy?: SessionTemplateOrderByWithRelationInput | SessionTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SessionTemplates.
     */
    cursor?: SessionTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SessionTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SessionTemplates.
     */
    skip?: number
    distinct?: SessionTemplateScalarFieldEnum | SessionTemplateScalarFieldEnum[]
  }

  /**
   * SessionTemplate create
   */
  export type SessionTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionTemplate
     */
    select?: SessionTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionTemplate
     */
    omit?: SessionTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionTemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a SessionTemplate.
     */
    data: XOR<SessionTemplateCreateInput, SessionTemplateUncheckedCreateInput>
  }

  /**
   * SessionTemplate createMany
   */
  export type SessionTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SessionTemplates.
     */
    data: SessionTemplateCreateManyInput | SessionTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SessionTemplate createManyAndReturn
   */
  export type SessionTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionTemplate
     */
    select?: SessionTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SessionTemplate
     */
    omit?: SessionTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many SessionTemplates.
     */
    data: SessionTemplateCreateManyInput | SessionTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SessionTemplate update
   */
  export type SessionTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionTemplate
     */
    select?: SessionTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionTemplate
     */
    omit?: SessionTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionTemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a SessionTemplate.
     */
    data: XOR<SessionTemplateUpdateInput, SessionTemplateUncheckedUpdateInput>
    /**
     * Choose, which SessionTemplate to update.
     */
    where: SessionTemplateWhereUniqueInput
  }

  /**
   * SessionTemplate updateMany
   */
  export type SessionTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SessionTemplates.
     */
    data: XOR<SessionTemplateUpdateManyMutationInput, SessionTemplateUncheckedUpdateManyInput>
    /**
     * Filter which SessionTemplates to update
     */
    where?: SessionTemplateWhereInput
    /**
     * Limit how many SessionTemplates to update.
     */
    limit?: number
  }

  /**
   * SessionTemplate updateManyAndReturn
   */
  export type SessionTemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionTemplate
     */
    select?: SessionTemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SessionTemplate
     */
    omit?: SessionTemplateOmit<ExtArgs> | null
    /**
     * The data used to update SessionTemplates.
     */
    data: XOR<SessionTemplateUpdateManyMutationInput, SessionTemplateUncheckedUpdateManyInput>
    /**
     * Filter which SessionTemplates to update
     */
    where?: SessionTemplateWhereInput
    /**
     * Limit how many SessionTemplates to update.
     */
    limit?: number
  }

  /**
   * SessionTemplate upsert
   */
  export type SessionTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionTemplate
     */
    select?: SessionTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionTemplate
     */
    omit?: SessionTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionTemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the SessionTemplate to update in case it exists.
     */
    where: SessionTemplateWhereUniqueInput
    /**
     * In case the SessionTemplate found by the `where` argument doesn't exist, create a new SessionTemplate with this data.
     */
    create: XOR<SessionTemplateCreateInput, SessionTemplateUncheckedCreateInput>
    /**
     * In case the SessionTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionTemplateUpdateInput, SessionTemplateUncheckedUpdateInput>
  }

  /**
   * SessionTemplate delete
   */
  export type SessionTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionTemplate
     */
    select?: SessionTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionTemplate
     */
    omit?: SessionTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionTemplateInclude<ExtArgs> | null
    /**
     * Filter which SessionTemplate to delete.
     */
    where: SessionTemplateWhereUniqueInput
  }

  /**
   * SessionTemplate deleteMany
   */
  export type SessionTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SessionTemplates to delete
     */
    where?: SessionTemplateWhereInput
    /**
     * Limit how many SessionTemplates to delete.
     */
    limit?: number
  }

  /**
   * SessionTemplate.sessions
   */
  export type SessionTemplate$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * SessionTemplate without action
   */
  export type SessionTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionTemplate
     */
    select?: SessionTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionTemplate
     */
    omit?: SessionTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionTemplateInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    duration: number | null
    bpm: number | null
    mood: number | null
    focus: number | null
  }

  export type SessionSumAggregateOutputType = {
    duration: number | null
    bpm: number | null
    mood: number | null
    focus: number | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    duration: number | null
    topic: string | null
    notes: string | null
    bpm: number | null
    instrument: string | null
    intention: string | null
    intentionMet: boolean | null
    mood: number | null
    focus: number | null
    isFavorited: boolean | null
    isPublic: boolean | null
    songId: string | null
    instructorId: string | null
    goalId: string | null
    pickup: string | null
    templateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    duration: number | null
    topic: string | null
    notes: string | null
    bpm: number | null
    instrument: string | null
    intention: string | null
    intentionMet: boolean | null
    mood: number | null
    focus: number | null
    isFavorited: boolean | null
    isPublic: boolean | null
    songId: string | null
    instructorId: string | null
    goalId: string | null
    pickup: string | null
    templateId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    date: number
    duration: number
    topic: number
    notes: number
    bpm: number
    instrument: number
    intention: number
    intentionMet: number
    mood: number
    focus: number
    isFavorited: number
    isPublic: number
    songId: number
    instructorId: number
    goalId: number
    pickup: number
    templateId: number
    checklistAnswers: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    duration?: true
    bpm?: true
    mood?: true
    focus?: true
  }

  export type SessionSumAggregateInputType = {
    duration?: true
    bpm?: true
    mood?: true
    focus?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    duration?: true
    topic?: true
    notes?: true
    bpm?: true
    instrument?: true
    intention?: true
    intentionMet?: true
    mood?: true
    focus?: true
    isFavorited?: true
    isPublic?: true
    songId?: true
    instructorId?: true
    goalId?: true
    pickup?: true
    templateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    duration?: true
    topic?: true
    notes?: true
    bpm?: true
    instrument?: true
    intention?: true
    intentionMet?: true
    mood?: true
    focus?: true
    isFavorited?: true
    isPublic?: true
    songId?: true
    instructorId?: true
    goalId?: true
    pickup?: true
    templateId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    duration?: true
    topic?: true
    notes?: true
    bpm?: true
    instrument?: true
    intention?: true
    intentionMet?: true
    mood?: true
    focus?: true
    isFavorited?: true
    isPublic?: true
    songId?: true
    instructorId?: true
    goalId?: true
    pickup?: true
    templateId?: true
    checklistAnswers?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    date: Date
    duration: number
    topic: string | null
    notes: string | null
    bpm: number | null
    instrument: string | null
    intention: string | null
    intentionMet: boolean | null
    mood: number | null
    focus: number | null
    isFavorited: boolean
    isPublic: boolean
    songId: string | null
    instructorId: string | null
    goalId: string | null
    pickup: string | null
    templateId: string | null
    checklistAnswers: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    duration?: boolean
    topic?: boolean
    notes?: boolean
    bpm?: boolean
    instrument?: boolean
    intention?: boolean
    intentionMet?: boolean
    mood?: boolean
    focus?: boolean
    isFavorited?: boolean
    isPublic?: boolean
    songId?: boolean
    instructorId?: boolean
    goalId?: boolean
    pickup?: boolean
    templateId?: boolean
    checklistAnswers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    song?: boolean | Session$songArgs<ExtArgs>
    tags?: boolean | Session$tagsArgs<ExtArgs>
    recordings?: boolean | Session$recordingsArgs<ExtArgs>
    instructor?: boolean | Session$instructorArgs<ExtArgs>
    goal?: boolean | Session$goalArgs<ExtArgs>
    template?: boolean | Session$templateArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    duration?: boolean
    topic?: boolean
    notes?: boolean
    bpm?: boolean
    instrument?: boolean
    intention?: boolean
    intentionMet?: boolean
    mood?: boolean
    focus?: boolean
    isFavorited?: boolean
    isPublic?: boolean
    songId?: boolean
    instructorId?: boolean
    goalId?: boolean
    pickup?: boolean
    templateId?: boolean
    checklistAnswers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    song?: boolean | Session$songArgs<ExtArgs>
    instructor?: boolean | Session$instructorArgs<ExtArgs>
    goal?: boolean | Session$goalArgs<ExtArgs>
    template?: boolean | Session$templateArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    duration?: boolean
    topic?: boolean
    notes?: boolean
    bpm?: boolean
    instrument?: boolean
    intention?: boolean
    intentionMet?: boolean
    mood?: boolean
    focus?: boolean
    isFavorited?: boolean
    isPublic?: boolean
    songId?: boolean
    instructorId?: boolean
    goalId?: boolean
    pickup?: boolean
    templateId?: boolean
    checklistAnswers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    song?: boolean | Session$songArgs<ExtArgs>
    instructor?: boolean | Session$instructorArgs<ExtArgs>
    goal?: boolean | Session$goalArgs<ExtArgs>
    template?: boolean | Session$templateArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    date?: boolean
    duration?: boolean
    topic?: boolean
    notes?: boolean
    bpm?: boolean
    instrument?: boolean
    intention?: boolean
    intentionMet?: boolean
    mood?: boolean
    focus?: boolean
    isFavorited?: boolean
    isPublic?: boolean
    songId?: boolean
    instructorId?: boolean
    goalId?: boolean
    pickup?: boolean
    templateId?: boolean
    checklistAnswers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "date" | "duration" | "topic" | "notes" | "bpm" | "instrument" | "intention" | "intentionMet" | "mood" | "focus" | "isFavorited" | "isPublic" | "songId" | "instructorId" | "goalId" | "pickup" | "templateId" | "checklistAnswers" | "createdAt" | "updatedAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    song?: boolean | Session$songArgs<ExtArgs>
    tags?: boolean | Session$tagsArgs<ExtArgs>
    recordings?: boolean | Session$recordingsArgs<ExtArgs>
    instructor?: boolean | Session$instructorArgs<ExtArgs>
    goal?: boolean | Session$goalArgs<ExtArgs>
    template?: boolean | Session$templateArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    song?: boolean | Session$songArgs<ExtArgs>
    instructor?: boolean | Session$instructorArgs<ExtArgs>
    goal?: boolean | Session$goalArgs<ExtArgs>
    template?: boolean | Session$templateArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    song?: boolean | Session$songArgs<ExtArgs>
    instructor?: boolean | Session$instructorArgs<ExtArgs>
    goal?: boolean | Session$goalArgs<ExtArgs>
    template?: boolean | Session$templateArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      song: Prisma.$SongPayload<ExtArgs> | null
      tags: Prisma.$TagPayload<ExtArgs>[]
      recordings: Prisma.$RecordingPayload<ExtArgs>[]
      instructor: Prisma.$InstructorPayload<ExtArgs> | null
      goal: Prisma.$GoalPayload<ExtArgs> | null
      template: Prisma.$SessionTemplatePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      date: Date
      duration: number
      topic: string | null
      notes: string | null
      bpm: number | null
      instrument: string | null
      intention: string | null
      intentionMet: boolean | null
      mood: number | null
      focus: number | null
      isFavorited: boolean
      isPublic: boolean
      songId: string | null
      instructorId: string | null
      goalId: string | null
      pickup: string | null
      templateId: string | null
      checklistAnswers: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    song<T extends Session$songArgs<ExtArgs> = {}>(args?: Subset<T, Session$songArgs<ExtArgs>>): Prisma__SongClient<$Result.GetResult<Prisma.$SongPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tags<T extends Session$tagsArgs<ExtArgs> = {}>(args?: Subset<T, Session$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    recordings<T extends Session$recordingsArgs<ExtArgs> = {}>(args?: Subset<T, Session$recordingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RecordingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    instructor<T extends Session$instructorArgs<ExtArgs> = {}>(args?: Subset<T, Session$instructorArgs<ExtArgs>>): Prisma__InstructorClient<$Result.GetResult<Prisma.$InstructorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    goal<T extends Session$goalArgs<ExtArgs> = {}>(args?: Subset<T, Session$goalArgs<ExtArgs>>): Prisma__GoalClient<$Result.GetResult<Prisma.$GoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    template<T extends Session$templateArgs<ExtArgs> = {}>(args?: Subset<T, Session$templateArgs<ExtArgs>>): Prisma__SessionTemplateClient<$Result.GetResult<Prisma.$SessionTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly date: FieldRef<"Session", 'DateTime'>
    readonly duration: FieldRef<"Session", 'Int'>
    readonly topic: FieldRef<"Session", 'String'>
    readonly notes: FieldRef<"Session", 'String'>
    readonly bpm: FieldRef<"Session", 'Int'>
    readonly instrument: FieldRef<"Session", 'String'>
    readonly intention: FieldRef<"Session", 'String'>
    readonly intentionMet: FieldRef<"Session", 'Boolean'>
    readonly mood: FieldRef<"Session", 'Int'>
    readonly focus: FieldRef<"Session", 'Int'>
    readonly isFavorited: FieldRef<"Session", 'Boolean'>
    readonly isPublic: FieldRef<"Session", 'Boolean'>
    readonly songId: FieldRef<"Session", 'String'>
    readonly instructorId: FieldRef<"Session", 'String'>
    readonly goalId: FieldRef<"Session", 'String'>
    readonly pickup: FieldRef<"Session", 'String'>
    readonly templateId: FieldRef<"Session", 'String'>
    readonly checklistAnswers: FieldRef<"Session", 'Json'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session.song
   */
  export type Session$songArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Song
     */
    select?: SongSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Song
     */
    omit?: SongOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SongInclude<ExtArgs> | null
    where?: SongWhereInput
  }

  /**
   * Session.tags
   */
  export type Session$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tag
     */
    select?: TagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tag
     */
    omit?: TagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TagInclude<ExtArgs> | null
    where?: TagWhereInput
    orderBy?: TagOrderByWithRelationInput | TagOrderByWithRelationInput[]
    cursor?: TagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagScalarFieldEnum | TagScalarFieldEnum[]
  }

  /**
   * Session.recordings
   */
  export type Session$recordingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Recording
     */
    select?: RecordingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Recording
     */
    omit?: RecordingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RecordingInclude<ExtArgs> | null
    where?: RecordingWhereInput
    orderBy?: RecordingOrderByWithRelationInput | RecordingOrderByWithRelationInput[]
    cursor?: RecordingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RecordingScalarFieldEnum | RecordingScalarFieldEnum[]
  }

  /**
   * Session.instructor
   */
  export type Session$instructorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instructor
     */
    select?: InstructorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instructor
     */
    omit?: InstructorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstructorInclude<ExtArgs> | null
    where?: InstructorWhereInput
  }

  /**
   * Session.goal
   */
  export type Session$goalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Goal
     */
    select?: GoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Goal
     */
    omit?: GoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GoalInclude<ExtArgs> | null
    where?: GoalWhereInput
  }

  /**
   * Session.template
   */
  export type Session$templateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionTemplate
     */
    select?: SessionTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SessionTemplate
     */
    omit?: SessionTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionTemplateInclude<ExtArgs> | null
    where?: SessionTemplateWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SongScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    key: 'key',
    capo: 'capo',
    tuning: 'tuning',
    thumbStyle: 'thumbStyle',
    status: 'status',
    currentBlocker: 'currentBlocker',
    createdAt: 'createdAt'
  };

  export type SongScalarFieldEnum = (typeof SongScalarFieldEnum)[keyof typeof SongScalarFieldEnum]


  export const SongVideoScalarFieldEnum: {
    id: 'id',
    songId: 'songId',
    label: 'label',
    url: 'url',
    createdAt: 'createdAt'
  };

  export type SongVideoScalarFieldEnum = (typeof SongVideoScalarFieldEnum)[keyof typeof SongVideoScalarFieldEnum]


  export const TagScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name'
  };

  export type TagScalarFieldEnum = (typeof TagScalarFieldEnum)[keyof typeof TagScalarFieldEnum]


  export const RecordingScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    url: 'url',
    label: 'label',
    createdAt: 'createdAt'
  };

  export type RecordingScalarFieldEnum = (typeof RecordingScalarFieldEnum)[keyof typeof RecordingScalarFieldEnum]


  export const InstructorScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type InstructorScalarFieldEnum = (typeof InstructorScalarFieldEnum)[keyof typeof InstructorScalarFieldEnum]


  export const GoalScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    createdAt: 'createdAt'
  };

  export type GoalScalarFieldEnum = (typeof GoalScalarFieldEnum)[keyof typeof GoalScalarFieldEnum]


  export const SessionTemplateScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    showMetronome: 'showMetronome',
    showSongPicker: 'showSongPicker',
    showGoalPicker: 'showGoalPicker',
    checklistItems: 'checklistItems',
    createdAt: 'createdAt'
  };

  export type SessionTemplateScalarFieldEnum = (typeof SessionTemplateScalarFieldEnum)[keyof typeof SessionTemplateScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    date: 'date',
    duration: 'duration',
    topic: 'topic',
    notes: 'notes',
    bpm: 'bpm',
    instrument: 'instrument',
    intention: 'intention',
    intentionMet: 'intentionMet',
    mood: 'mood',
    focus: 'focus',
    isFavorited: 'isFavorited',
    isPublic: 'isPublic',
    songId: 'songId',
    instructorId: 'instructorId',
    goalId: 'goalId',
    pickup: 'pickup',
    templateId: 'templateId',
    checklistAnswers: 'checklistAnswers',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Key'
   */
  export type EnumKeyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Key'>
    


  /**
   * Reference to a field of type 'Key[]'
   */
  export type ListEnumKeyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Key[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Tuning'
   */
  export type EnumTuningFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Tuning'>
    


  /**
   * Reference to a field of type 'Tuning[]'
   */
  export type ListEnumTuningFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Tuning[]'>
    


  /**
   * Reference to a field of type 'ThumbStyle'
   */
  export type EnumThumbStyleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ThumbStyle'>
    


  /**
   * Reference to a field of type 'ThumbStyle[]'
   */
  export type ListEnumThumbStyleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ThumbStyle[]'>
    


  /**
   * Reference to a field of type 'SongStatus'
   */
  export type EnumSongStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SongStatus'>
    


  /**
   * Reference to a field of type 'SongStatus[]'
   */
  export type ListEnumSongStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SongStatus[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type SongWhereInput = {
    AND?: SongWhereInput | SongWhereInput[]
    OR?: SongWhereInput[]
    NOT?: SongWhereInput | SongWhereInput[]
    id?: StringFilter<"Song"> | string
    userId?: StringFilter<"Song"> | string
    title?: StringFilter<"Song"> | string
    key?: EnumKeyNullableFilter<"Song"> | $Enums.Key | null
    capo?: IntNullableFilter<"Song"> | number | null
    tuning?: EnumTuningFilter<"Song"> | $Enums.Tuning
    thumbStyle?: EnumThumbStyleNullableFilter<"Song"> | $Enums.ThumbStyle | null
    status?: EnumSongStatusFilter<"Song"> | $Enums.SongStatus
    currentBlocker?: StringNullableFilter<"Song"> | string | null
    createdAt?: DateTimeFilter<"Song"> | Date | string
    sessions?: SessionListRelationFilter
    videos?: SongVideoListRelationFilter
  }

  export type SongOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    key?: SortOrderInput | SortOrder
    capo?: SortOrderInput | SortOrder
    tuning?: SortOrder
    thumbStyle?: SortOrderInput | SortOrder
    status?: SortOrder
    currentBlocker?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    videos?: SongVideoOrderByRelationAggregateInput
  }

  export type SongWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_title?: SongUserIdTitleCompoundUniqueInput
    AND?: SongWhereInput | SongWhereInput[]
    OR?: SongWhereInput[]
    NOT?: SongWhereInput | SongWhereInput[]
    userId?: StringFilter<"Song"> | string
    title?: StringFilter<"Song"> | string
    key?: EnumKeyNullableFilter<"Song"> | $Enums.Key | null
    capo?: IntNullableFilter<"Song"> | number | null
    tuning?: EnumTuningFilter<"Song"> | $Enums.Tuning
    thumbStyle?: EnumThumbStyleNullableFilter<"Song"> | $Enums.ThumbStyle | null
    status?: EnumSongStatusFilter<"Song"> | $Enums.SongStatus
    currentBlocker?: StringNullableFilter<"Song"> | string | null
    createdAt?: DateTimeFilter<"Song"> | Date | string
    sessions?: SessionListRelationFilter
    videos?: SongVideoListRelationFilter
  }, "id" | "userId_title">

  export type SongOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    key?: SortOrderInput | SortOrder
    capo?: SortOrderInput | SortOrder
    tuning?: SortOrder
    thumbStyle?: SortOrderInput | SortOrder
    status?: SortOrder
    currentBlocker?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SongCountOrderByAggregateInput
    _avg?: SongAvgOrderByAggregateInput
    _max?: SongMaxOrderByAggregateInput
    _min?: SongMinOrderByAggregateInput
    _sum?: SongSumOrderByAggregateInput
  }

  export type SongScalarWhereWithAggregatesInput = {
    AND?: SongScalarWhereWithAggregatesInput | SongScalarWhereWithAggregatesInput[]
    OR?: SongScalarWhereWithAggregatesInput[]
    NOT?: SongScalarWhereWithAggregatesInput | SongScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Song"> | string
    userId?: StringWithAggregatesFilter<"Song"> | string
    title?: StringWithAggregatesFilter<"Song"> | string
    key?: EnumKeyNullableWithAggregatesFilter<"Song"> | $Enums.Key | null
    capo?: IntNullableWithAggregatesFilter<"Song"> | number | null
    tuning?: EnumTuningWithAggregatesFilter<"Song"> | $Enums.Tuning
    thumbStyle?: EnumThumbStyleNullableWithAggregatesFilter<"Song"> | $Enums.ThumbStyle | null
    status?: EnumSongStatusWithAggregatesFilter<"Song"> | $Enums.SongStatus
    currentBlocker?: StringNullableWithAggregatesFilter<"Song"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Song"> | Date | string
  }

  export type SongVideoWhereInput = {
    AND?: SongVideoWhereInput | SongVideoWhereInput[]
    OR?: SongVideoWhereInput[]
    NOT?: SongVideoWhereInput | SongVideoWhereInput[]
    id?: StringFilter<"SongVideo"> | string
    songId?: StringFilter<"SongVideo"> | string
    label?: StringFilter<"SongVideo"> | string
    url?: StringFilter<"SongVideo"> | string
    createdAt?: DateTimeFilter<"SongVideo"> | Date | string
    song?: XOR<SongScalarRelationFilter, SongWhereInput>
  }

  export type SongVideoOrderByWithRelationInput = {
    id?: SortOrder
    songId?: SortOrder
    label?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    song?: SongOrderByWithRelationInput
  }

  export type SongVideoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SongVideoWhereInput | SongVideoWhereInput[]
    OR?: SongVideoWhereInput[]
    NOT?: SongVideoWhereInput | SongVideoWhereInput[]
    songId?: StringFilter<"SongVideo"> | string
    label?: StringFilter<"SongVideo"> | string
    url?: StringFilter<"SongVideo"> | string
    createdAt?: DateTimeFilter<"SongVideo"> | Date | string
    song?: XOR<SongScalarRelationFilter, SongWhereInput>
  }, "id">

  export type SongVideoOrderByWithAggregationInput = {
    id?: SortOrder
    songId?: SortOrder
    label?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    _count?: SongVideoCountOrderByAggregateInput
    _max?: SongVideoMaxOrderByAggregateInput
    _min?: SongVideoMinOrderByAggregateInput
  }

  export type SongVideoScalarWhereWithAggregatesInput = {
    AND?: SongVideoScalarWhereWithAggregatesInput | SongVideoScalarWhereWithAggregatesInput[]
    OR?: SongVideoScalarWhereWithAggregatesInput[]
    NOT?: SongVideoScalarWhereWithAggregatesInput | SongVideoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SongVideo"> | string
    songId?: StringWithAggregatesFilter<"SongVideo"> | string
    label?: StringWithAggregatesFilter<"SongVideo"> | string
    url?: StringWithAggregatesFilter<"SongVideo"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SongVideo"> | Date | string
  }

  export type TagWhereInput = {
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    id?: StringFilter<"Tag"> | string
    userId?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    sessions?: SessionListRelationFilter
  }

  export type TagOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type TagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_name?: TagUserIdNameCompoundUniqueInput
    AND?: TagWhereInput | TagWhereInput[]
    OR?: TagWhereInput[]
    NOT?: TagWhereInput | TagWhereInput[]
    userId?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
    sessions?: SessionListRelationFilter
  }, "id" | "userId_name">

  export type TagOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    _count?: TagCountOrderByAggregateInput
    _max?: TagMaxOrderByAggregateInput
    _min?: TagMinOrderByAggregateInput
  }

  export type TagScalarWhereWithAggregatesInput = {
    AND?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    OR?: TagScalarWhereWithAggregatesInput[]
    NOT?: TagScalarWhereWithAggregatesInput | TagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tag"> | string
    userId?: StringWithAggregatesFilter<"Tag"> | string
    name?: StringWithAggregatesFilter<"Tag"> | string
  }

  export type RecordingWhereInput = {
    AND?: RecordingWhereInput | RecordingWhereInput[]
    OR?: RecordingWhereInput[]
    NOT?: RecordingWhereInput | RecordingWhereInput[]
    id?: StringFilter<"Recording"> | string
    sessionId?: StringFilter<"Recording"> | string
    url?: StringFilter<"Recording"> | string
    label?: StringNullableFilter<"Recording"> | string | null
    createdAt?: DateTimeFilter<"Recording"> | Date | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }

  export type RecordingOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    url?: SortOrder
    label?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    session?: SessionOrderByWithRelationInput
  }

  export type RecordingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RecordingWhereInput | RecordingWhereInput[]
    OR?: RecordingWhereInput[]
    NOT?: RecordingWhereInput | RecordingWhereInput[]
    sessionId?: StringFilter<"Recording"> | string
    url?: StringFilter<"Recording"> | string
    label?: StringNullableFilter<"Recording"> | string | null
    createdAt?: DateTimeFilter<"Recording"> | Date | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
  }, "id">

  export type RecordingOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    url?: SortOrder
    label?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RecordingCountOrderByAggregateInput
    _max?: RecordingMaxOrderByAggregateInput
    _min?: RecordingMinOrderByAggregateInput
  }

  export type RecordingScalarWhereWithAggregatesInput = {
    AND?: RecordingScalarWhereWithAggregatesInput | RecordingScalarWhereWithAggregatesInput[]
    OR?: RecordingScalarWhereWithAggregatesInput[]
    NOT?: RecordingScalarWhereWithAggregatesInput | RecordingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Recording"> | string
    sessionId?: StringWithAggregatesFilter<"Recording"> | string
    url?: StringWithAggregatesFilter<"Recording"> | string
    label?: StringNullableWithAggregatesFilter<"Recording"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Recording"> | Date | string
  }

  export type InstructorWhereInput = {
    AND?: InstructorWhereInput | InstructorWhereInput[]
    OR?: InstructorWhereInput[]
    NOT?: InstructorWhereInput | InstructorWhereInput[]
    id?: StringFilter<"Instructor"> | string
    userId?: StringFilter<"Instructor"> | string
    name?: StringFilter<"Instructor"> | string
    createdAt?: DateTimeFilter<"Instructor"> | Date | string
    sessions?: SessionListRelationFilter
  }

  export type InstructorOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type InstructorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_name?: InstructorUserIdNameCompoundUniqueInput
    AND?: InstructorWhereInput | InstructorWhereInput[]
    OR?: InstructorWhereInput[]
    NOT?: InstructorWhereInput | InstructorWhereInput[]
    userId?: StringFilter<"Instructor"> | string
    name?: StringFilter<"Instructor"> | string
    createdAt?: DateTimeFilter<"Instructor"> | Date | string
    sessions?: SessionListRelationFilter
  }, "id" | "userId_name">

  export type InstructorOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: InstructorCountOrderByAggregateInput
    _max?: InstructorMaxOrderByAggregateInput
    _min?: InstructorMinOrderByAggregateInput
  }

  export type InstructorScalarWhereWithAggregatesInput = {
    AND?: InstructorScalarWhereWithAggregatesInput | InstructorScalarWhereWithAggregatesInput[]
    OR?: InstructorScalarWhereWithAggregatesInput[]
    NOT?: InstructorScalarWhereWithAggregatesInput | InstructorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Instructor"> | string
    userId?: StringWithAggregatesFilter<"Instructor"> | string
    name?: StringWithAggregatesFilter<"Instructor"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Instructor"> | Date | string
  }

  export type GoalWhereInput = {
    AND?: GoalWhereInput | GoalWhereInput[]
    OR?: GoalWhereInput[]
    NOT?: GoalWhereInput | GoalWhereInput[]
    id?: StringFilter<"Goal"> | string
    userId?: StringFilter<"Goal"> | string
    name?: StringFilter<"Goal"> | string
    createdAt?: DateTimeFilter<"Goal"> | Date | string
    sessions?: SessionListRelationFilter
  }

  export type GoalOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type GoalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_name?: GoalUserIdNameCompoundUniqueInput
    AND?: GoalWhereInput | GoalWhereInput[]
    OR?: GoalWhereInput[]
    NOT?: GoalWhereInput | GoalWhereInput[]
    userId?: StringFilter<"Goal"> | string
    name?: StringFilter<"Goal"> | string
    createdAt?: DateTimeFilter<"Goal"> | Date | string
    sessions?: SessionListRelationFilter
  }, "id" | "userId_name">

  export type GoalOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    _count?: GoalCountOrderByAggregateInput
    _max?: GoalMaxOrderByAggregateInput
    _min?: GoalMinOrderByAggregateInput
  }

  export type GoalScalarWhereWithAggregatesInput = {
    AND?: GoalScalarWhereWithAggregatesInput | GoalScalarWhereWithAggregatesInput[]
    OR?: GoalScalarWhereWithAggregatesInput[]
    NOT?: GoalScalarWhereWithAggregatesInput | GoalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Goal"> | string
    userId?: StringWithAggregatesFilter<"Goal"> | string
    name?: StringWithAggregatesFilter<"Goal"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Goal"> | Date | string
  }

  export type SessionTemplateWhereInput = {
    AND?: SessionTemplateWhereInput | SessionTemplateWhereInput[]
    OR?: SessionTemplateWhereInput[]
    NOT?: SessionTemplateWhereInput | SessionTemplateWhereInput[]
    id?: StringFilter<"SessionTemplate"> | string
    userId?: StringFilter<"SessionTemplate"> | string
    name?: StringFilter<"SessionTemplate"> | string
    showMetronome?: BoolFilter<"SessionTemplate"> | boolean
    showSongPicker?: BoolFilter<"SessionTemplate"> | boolean
    showGoalPicker?: BoolFilter<"SessionTemplate"> | boolean
    checklistItems?: JsonNullableFilter<"SessionTemplate">
    createdAt?: DateTimeFilter<"SessionTemplate"> | Date | string
    sessions?: SessionListRelationFilter
  }

  export type SessionTemplateOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    showMetronome?: SortOrder
    showSongPicker?: SortOrder
    showGoalPicker?: SortOrder
    checklistItems?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type SessionTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_name?: SessionTemplateUserIdNameCompoundUniqueInput
    AND?: SessionTemplateWhereInput | SessionTemplateWhereInput[]
    OR?: SessionTemplateWhereInput[]
    NOT?: SessionTemplateWhereInput | SessionTemplateWhereInput[]
    userId?: StringFilter<"SessionTemplate"> | string
    name?: StringFilter<"SessionTemplate"> | string
    showMetronome?: BoolFilter<"SessionTemplate"> | boolean
    showSongPicker?: BoolFilter<"SessionTemplate"> | boolean
    showGoalPicker?: BoolFilter<"SessionTemplate"> | boolean
    checklistItems?: JsonNullableFilter<"SessionTemplate">
    createdAt?: DateTimeFilter<"SessionTemplate"> | Date | string
    sessions?: SessionListRelationFilter
  }, "id" | "userId_name">

  export type SessionTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    showMetronome?: SortOrder
    showSongPicker?: SortOrder
    showGoalPicker?: SortOrder
    checklistItems?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SessionTemplateCountOrderByAggregateInput
    _max?: SessionTemplateMaxOrderByAggregateInput
    _min?: SessionTemplateMinOrderByAggregateInput
  }

  export type SessionTemplateScalarWhereWithAggregatesInput = {
    AND?: SessionTemplateScalarWhereWithAggregatesInput | SessionTemplateScalarWhereWithAggregatesInput[]
    OR?: SessionTemplateScalarWhereWithAggregatesInput[]
    NOT?: SessionTemplateScalarWhereWithAggregatesInput | SessionTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SessionTemplate"> | string
    userId?: StringWithAggregatesFilter<"SessionTemplate"> | string
    name?: StringWithAggregatesFilter<"SessionTemplate"> | string
    showMetronome?: BoolWithAggregatesFilter<"SessionTemplate"> | boolean
    showSongPicker?: BoolWithAggregatesFilter<"SessionTemplate"> | boolean
    showGoalPicker?: BoolWithAggregatesFilter<"SessionTemplate"> | boolean
    checklistItems?: JsonNullableWithAggregatesFilter<"SessionTemplate">
    createdAt?: DateTimeWithAggregatesFilter<"SessionTemplate"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    date?: DateTimeFilter<"Session"> | Date | string
    duration?: IntFilter<"Session"> | number
    topic?: StringNullableFilter<"Session"> | string | null
    notes?: StringNullableFilter<"Session"> | string | null
    bpm?: IntNullableFilter<"Session"> | number | null
    instrument?: StringNullableFilter<"Session"> | string | null
    intention?: StringNullableFilter<"Session"> | string | null
    intentionMet?: BoolNullableFilter<"Session"> | boolean | null
    mood?: IntNullableFilter<"Session"> | number | null
    focus?: IntNullableFilter<"Session"> | number | null
    isFavorited?: BoolFilter<"Session"> | boolean
    isPublic?: BoolFilter<"Session"> | boolean
    songId?: StringNullableFilter<"Session"> | string | null
    instructorId?: StringNullableFilter<"Session"> | string | null
    goalId?: StringNullableFilter<"Session"> | string | null
    pickup?: StringNullableFilter<"Session"> | string | null
    templateId?: StringNullableFilter<"Session"> | string | null
    checklistAnswers?: JsonNullableFilter<"Session">
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    song?: XOR<SongNullableScalarRelationFilter, SongWhereInput> | null
    tags?: TagListRelationFilter
    recordings?: RecordingListRelationFilter
    instructor?: XOR<InstructorNullableScalarRelationFilter, InstructorWhereInput> | null
    goal?: XOR<GoalNullableScalarRelationFilter, GoalWhereInput> | null
    template?: XOR<SessionTemplateNullableScalarRelationFilter, SessionTemplateWhereInput> | null
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    topic?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    bpm?: SortOrderInput | SortOrder
    instrument?: SortOrderInput | SortOrder
    intention?: SortOrderInput | SortOrder
    intentionMet?: SortOrderInput | SortOrder
    mood?: SortOrderInput | SortOrder
    focus?: SortOrderInput | SortOrder
    isFavorited?: SortOrder
    isPublic?: SortOrder
    songId?: SortOrderInput | SortOrder
    instructorId?: SortOrderInput | SortOrder
    goalId?: SortOrderInput | SortOrder
    pickup?: SortOrderInput | SortOrder
    templateId?: SortOrderInput | SortOrder
    checklistAnswers?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    song?: SongOrderByWithRelationInput
    tags?: TagOrderByRelationAggregateInput
    recordings?: RecordingOrderByRelationAggregateInput
    instructor?: InstructorOrderByWithRelationInput
    goal?: GoalOrderByWithRelationInput
    template?: SessionTemplateOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    date?: DateTimeFilter<"Session"> | Date | string
    duration?: IntFilter<"Session"> | number
    topic?: StringNullableFilter<"Session"> | string | null
    notes?: StringNullableFilter<"Session"> | string | null
    bpm?: IntNullableFilter<"Session"> | number | null
    instrument?: StringNullableFilter<"Session"> | string | null
    intention?: StringNullableFilter<"Session"> | string | null
    intentionMet?: BoolNullableFilter<"Session"> | boolean | null
    mood?: IntNullableFilter<"Session"> | number | null
    focus?: IntNullableFilter<"Session"> | number | null
    isFavorited?: BoolFilter<"Session"> | boolean
    isPublic?: BoolFilter<"Session"> | boolean
    songId?: StringNullableFilter<"Session"> | string | null
    instructorId?: StringNullableFilter<"Session"> | string | null
    goalId?: StringNullableFilter<"Session"> | string | null
    pickup?: StringNullableFilter<"Session"> | string | null
    templateId?: StringNullableFilter<"Session"> | string | null
    checklistAnswers?: JsonNullableFilter<"Session">
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    song?: XOR<SongNullableScalarRelationFilter, SongWhereInput> | null
    tags?: TagListRelationFilter
    recordings?: RecordingListRelationFilter
    instructor?: XOR<InstructorNullableScalarRelationFilter, InstructorWhereInput> | null
    goal?: XOR<GoalNullableScalarRelationFilter, GoalWhereInput> | null
    template?: XOR<SessionTemplateNullableScalarRelationFilter, SessionTemplateWhereInput> | null
  }, "id">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    topic?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    bpm?: SortOrderInput | SortOrder
    instrument?: SortOrderInput | SortOrder
    intention?: SortOrderInput | SortOrder
    intentionMet?: SortOrderInput | SortOrder
    mood?: SortOrderInput | SortOrder
    focus?: SortOrderInput | SortOrder
    isFavorited?: SortOrder
    isPublic?: SortOrder
    songId?: SortOrderInput | SortOrder
    instructorId?: SortOrderInput | SortOrder
    goalId?: SortOrderInput | SortOrder
    pickup?: SortOrderInput | SortOrder
    templateId?: SortOrderInput | SortOrder
    checklistAnswers?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    date?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    duration?: IntWithAggregatesFilter<"Session"> | number
    topic?: StringNullableWithAggregatesFilter<"Session"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Session"> | string | null
    bpm?: IntNullableWithAggregatesFilter<"Session"> | number | null
    instrument?: StringNullableWithAggregatesFilter<"Session"> | string | null
    intention?: StringNullableWithAggregatesFilter<"Session"> | string | null
    intentionMet?: BoolNullableWithAggregatesFilter<"Session"> | boolean | null
    mood?: IntNullableWithAggregatesFilter<"Session"> | number | null
    focus?: IntNullableWithAggregatesFilter<"Session"> | number | null
    isFavorited?: BoolWithAggregatesFilter<"Session"> | boolean
    isPublic?: BoolWithAggregatesFilter<"Session"> | boolean
    songId?: StringNullableWithAggregatesFilter<"Session"> | string | null
    instructorId?: StringNullableWithAggregatesFilter<"Session"> | string | null
    goalId?: StringNullableWithAggregatesFilter<"Session"> | string | null
    pickup?: StringNullableWithAggregatesFilter<"Session"> | string | null
    templateId?: StringNullableWithAggregatesFilter<"Session"> | string | null
    checklistAnswers?: JsonNullableWithAggregatesFilter<"Session">
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type SongCreateInput = {
    id?: string
    userId: string
    title: string
    key?: $Enums.Key | null
    capo?: number | null
    tuning?: $Enums.Tuning
    thumbStyle?: $Enums.ThumbStyle | null
    status?: $Enums.SongStatus
    currentBlocker?: string | null
    createdAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutSongInput
    videos?: SongVideoCreateNestedManyWithoutSongInput
  }

  export type SongUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    key?: $Enums.Key | null
    capo?: number | null
    tuning?: $Enums.Tuning
    thumbStyle?: $Enums.ThumbStyle | null
    status?: $Enums.SongStatus
    currentBlocker?: string | null
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutSongInput
    videos?: SongVideoUncheckedCreateNestedManyWithoutSongInput
  }

  export type SongUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    key?: NullableEnumKeyFieldUpdateOperationsInput | $Enums.Key | null
    capo?: NullableIntFieldUpdateOperationsInput | number | null
    tuning?: EnumTuningFieldUpdateOperationsInput | $Enums.Tuning
    thumbStyle?: NullableEnumThumbStyleFieldUpdateOperationsInput | $Enums.ThumbStyle | null
    status?: EnumSongStatusFieldUpdateOperationsInput | $Enums.SongStatus
    currentBlocker?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutSongNestedInput
    videos?: SongVideoUpdateManyWithoutSongNestedInput
  }

  export type SongUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    key?: NullableEnumKeyFieldUpdateOperationsInput | $Enums.Key | null
    capo?: NullableIntFieldUpdateOperationsInput | number | null
    tuning?: EnumTuningFieldUpdateOperationsInput | $Enums.Tuning
    thumbStyle?: NullableEnumThumbStyleFieldUpdateOperationsInput | $Enums.ThumbStyle | null
    status?: EnumSongStatusFieldUpdateOperationsInput | $Enums.SongStatus
    currentBlocker?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutSongNestedInput
    videos?: SongVideoUncheckedUpdateManyWithoutSongNestedInput
  }

  export type SongCreateManyInput = {
    id?: string
    userId: string
    title: string
    key?: $Enums.Key | null
    capo?: number | null
    tuning?: $Enums.Tuning
    thumbStyle?: $Enums.ThumbStyle | null
    status?: $Enums.SongStatus
    currentBlocker?: string | null
    createdAt?: Date | string
  }

  export type SongUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    key?: NullableEnumKeyFieldUpdateOperationsInput | $Enums.Key | null
    capo?: NullableIntFieldUpdateOperationsInput | number | null
    tuning?: EnumTuningFieldUpdateOperationsInput | $Enums.Tuning
    thumbStyle?: NullableEnumThumbStyleFieldUpdateOperationsInput | $Enums.ThumbStyle | null
    status?: EnumSongStatusFieldUpdateOperationsInput | $Enums.SongStatus
    currentBlocker?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SongUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    key?: NullableEnumKeyFieldUpdateOperationsInput | $Enums.Key | null
    capo?: NullableIntFieldUpdateOperationsInput | number | null
    tuning?: EnumTuningFieldUpdateOperationsInput | $Enums.Tuning
    thumbStyle?: NullableEnumThumbStyleFieldUpdateOperationsInput | $Enums.ThumbStyle | null
    status?: EnumSongStatusFieldUpdateOperationsInput | $Enums.SongStatus
    currentBlocker?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SongVideoCreateInput = {
    id?: string
    label: string
    url: string
    createdAt?: Date | string
    song: SongCreateNestedOneWithoutVideosInput
  }

  export type SongVideoUncheckedCreateInput = {
    id?: string
    songId: string
    label: string
    url: string
    createdAt?: Date | string
  }

  export type SongVideoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    song?: SongUpdateOneRequiredWithoutVideosNestedInput
  }

  export type SongVideoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    songId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SongVideoCreateManyInput = {
    id?: string
    songId: string
    label: string
    url: string
    createdAt?: Date | string
  }

  export type SongVideoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SongVideoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    songId?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TagCreateInput = {
    id?: string
    userId: string
    name: string
    sessions?: SessionCreateNestedManyWithoutTagsInput
  }

  export type TagUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    sessions?: SessionUncheckedCreateNestedManyWithoutTagsInput
  }

  export type TagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUpdateManyWithoutTagsNestedInput
  }

  export type TagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    sessions?: SessionUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type TagCreateManyInput = {
    id?: string
    userId: string
    name: string
  }

  export type TagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type RecordingCreateInput = {
    id?: string
    url: string
    label?: string | null
    createdAt?: Date | string
    session: SessionCreateNestedOneWithoutRecordingsInput
  }

  export type RecordingUncheckedCreateInput = {
    id?: string
    sessionId: string
    url: string
    label?: string | null
    createdAt?: Date | string
  }

  export type RecordingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneRequiredWithoutRecordingsNestedInput
  }

  export type RecordingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordingCreateManyInput = {
    id?: string
    sessionId: string
    url: string
    label?: string | null
    createdAt?: Date | string
  }

  export type RecordingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionId?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstructorCreateInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutInstructorInput
  }

  export type InstructorUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutInstructorInput
  }

  export type InstructorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutInstructorNestedInput
  }

  export type InstructorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutInstructorNestedInput
  }

  export type InstructorCreateManyInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
  }

  export type InstructorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstructorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalCreateInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutGoalInput
  }

  export type GoalUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutGoalInput
  }

  export type GoalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutGoalNestedInput
  }

  export type GoalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutGoalNestedInput
  }

  export type GoalCreateManyInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
  }

  export type GoalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionTemplateCreateInput = {
    id?: string
    userId: string
    name: string
    showMetronome?: boolean
    showSongPicker?: boolean
    showGoalPicker?: boolean
    checklistItems?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutTemplateInput
  }

  export type SessionTemplateUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    showMetronome?: boolean
    showSongPicker?: boolean
    showGoalPicker?: boolean
    checklistItems?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type SessionTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    showMetronome?: BoolFieldUpdateOperationsInput | boolean
    showSongPicker?: BoolFieldUpdateOperationsInput | boolean
    showGoalPicker?: BoolFieldUpdateOperationsInput | boolean
    checklistItems?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutTemplateNestedInput
  }

  export type SessionTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    showMetronome?: BoolFieldUpdateOperationsInput | boolean
    showSongPicker?: BoolFieldUpdateOperationsInput | boolean
    showGoalPicker?: BoolFieldUpdateOperationsInput | boolean
    checklistItems?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type SessionTemplateCreateManyInput = {
    id?: string
    userId: string
    name: string
    showMetronome?: boolean
    showSongPicker?: boolean
    showGoalPicker?: boolean
    checklistItems?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SessionTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    showMetronome?: BoolFieldUpdateOperationsInput | boolean
    showSongPicker?: BoolFieldUpdateOperationsInput | boolean
    showGoalPicker?: BoolFieldUpdateOperationsInput | boolean
    checklistItems?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    showMetronome?: BoolFieldUpdateOperationsInput | boolean
    showSongPicker?: BoolFieldUpdateOperationsInput | boolean
    showGoalPicker?: BoolFieldUpdateOperationsInput | boolean
    checklistItems?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    pickup?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    song?: SongCreateNestedOneWithoutSessionsInput
    tags?: TagCreateNestedManyWithoutSessionsInput
    recordings?: RecordingCreateNestedManyWithoutSessionInput
    instructor?: InstructorCreateNestedOneWithoutSessionsInput
    goal?: GoalCreateNestedOneWithoutSessionsInput
    template?: SessionTemplateCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    songId?: string | null
    instructorId?: string | null
    goalId?: string | null
    pickup?: string | null
    templateId?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutSessionsInput
    recordings?: RecordingUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    song?: SongUpdateOneWithoutSessionsNestedInput
    tags?: TagUpdateManyWithoutSessionsNestedInput
    recordings?: RecordingUpdateManyWithoutSessionNestedInput
    instructor?: InstructorUpdateOneWithoutSessionsNestedInput
    goal?: GoalUpdateOneWithoutSessionsNestedInput
    template?: SessionTemplateUpdateOneWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    songId?: NullableStringFieldUpdateOperationsInput | string | null
    instructorId?: NullableStringFieldUpdateOperationsInput | string | null
    goalId?: NullableStringFieldUpdateOperationsInput | string | null
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutSessionsNestedInput
    recordings?: RecordingUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    songId?: string | null
    instructorId?: string | null
    goalId?: string | null
    pickup?: string | null
    templateId?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    songId?: NullableStringFieldUpdateOperationsInput | string | null
    instructorId?: NullableStringFieldUpdateOperationsInput | string | null
    goalId?: NullableStringFieldUpdateOperationsInput | string | null
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumKeyNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Key | EnumKeyFieldRefInput<$PrismaModel> | null
    in?: $Enums.Key[] | ListEnumKeyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Key[] | ListEnumKeyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumKeyNullableFilter<$PrismaModel> | $Enums.Key | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumTuningFilter<$PrismaModel = never> = {
    equals?: $Enums.Tuning | EnumTuningFieldRefInput<$PrismaModel>
    in?: $Enums.Tuning[] | ListEnumTuningFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tuning[] | ListEnumTuningFieldRefInput<$PrismaModel>
    not?: NestedEnumTuningFilter<$PrismaModel> | $Enums.Tuning
  }

  export type EnumThumbStyleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ThumbStyle | EnumThumbStyleFieldRefInput<$PrismaModel> | null
    in?: $Enums.ThumbStyle[] | ListEnumThumbStyleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ThumbStyle[] | ListEnumThumbStyleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumThumbStyleNullableFilter<$PrismaModel> | $Enums.ThumbStyle | null
  }

  export type EnumSongStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SongStatus | EnumSongStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SongStatus[] | ListEnumSongStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SongStatus[] | ListEnumSongStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSongStatusFilter<$PrismaModel> | $Enums.SongStatus
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SongVideoListRelationFilter = {
    every?: SongVideoWhereInput
    some?: SongVideoWhereInput
    none?: SongVideoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SongVideoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SongUserIdTitleCompoundUniqueInput = {
    userId: string
    title: string
  }

  export type SongCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    key?: SortOrder
    capo?: SortOrder
    tuning?: SortOrder
    thumbStyle?: SortOrder
    status?: SortOrder
    currentBlocker?: SortOrder
    createdAt?: SortOrder
  }

  export type SongAvgOrderByAggregateInput = {
    capo?: SortOrder
  }

  export type SongMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    key?: SortOrder
    capo?: SortOrder
    tuning?: SortOrder
    thumbStyle?: SortOrder
    status?: SortOrder
    currentBlocker?: SortOrder
    createdAt?: SortOrder
  }

  export type SongMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    key?: SortOrder
    capo?: SortOrder
    tuning?: SortOrder
    thumbStyle?: SortOrder
    status?: SortOrder
    currentBlocker?: SortOrder
    createdAt?: SortOrder
  }

  export type SongSumOrderByAggregateInput = {
    capo?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumKeyNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Key | EnumKeyFieldRefInput<$PrismaModel> | null
    in?: $Enums.Key[] | ListEnumKeyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Key[] | ListEnumKeyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumKeyNullableWithAggregatesFilter<$PrismaModel> | $Enums.Key | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumKeyNullableFilter<$PrismaModel>
    _max?: NestedEnumKeyNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumTuningWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Tuning | EnumTuningFieldRefInput<$PrismaModel>
    in?: $Enums.Tuning[] | ListEnumTuningFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tuning[] | ListEnumTuningFieldRefInput<$PrismaModel>
    not?: NestedEnumTuningWithAggregatesFilter<$PrismaModel> | $Enums.Tuning
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTuningFilter<$PrismaModel>
    _max?: NestedEnumTuningFilter<$PrismaModel>
  }

  export type EnumThumbStyleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ThumbStyle | EnumThumbStyleFieldRefInput<$PrismaModel> | null
    in?: $Enums.ThumbStyle[] | ListEnumThumbStyleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ThumbStyle[] | ListEnumThumbStyleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumThumbStyleNullableWithAggregatesFilter<$PrismaModel> | $Enums.ThumbStyle | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumThumbStyleNullableFilter<$PrismaModel>
    _max?: NestedEnumThumbStyleNullableFilter<$PrismaModel>
  }

  export type EnumSongStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SongStatus | EnumSongStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SongStatus[] | ListEnumSongStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SongStatus[] | ListEnumSongStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSongStatusWithAggregatesFilter<$PrismaModel> | $Enums.SongStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSongStatusFilter<$PrismaModel>
    _max?: NestedEnumSongStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type SongScalarRelationFilter = {
    is?: SongWhereInput
    isNot?: SongWhereInput
  }

  export type SongVideoCountOrderByAggregateInput = {
    id?: SortOrder
    songId?: SortOrder
    label?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
  }

  export type SongVideoMaxOrderByAggregateInput = {
    id?: SortOrder
    songId?: SortOrder
    label?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
  }

  export type SongVideoMinOrderByAggregateInput = {
    id?: SortOrder
    songId?: SortOrder
    label?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
  }

  export type TagUserIdNameCompoundUniqueInput = {
    userId: string
    name: string
  }

  export type TagCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
  }

  export type TagMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
  }

  export type TagMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
  }

  export type SessionScalarRelationFilter = {
    is?: SessionWhereInput
    isNot?: SessionWhereInput
  }

  export type RecordingCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    url?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
  }

  export type RecordingMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    url?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
  }

  export type RecordingMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    url?: SortOrder
    label?: SortOrder
    createdAt?: SortOrder
  }

  export type InstructorUserIdNameCompoundUniqueInput = {
    userId: string
    name: string
  }

  export type InstructorCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type InstructorMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type InstructorMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type GoalUserIdNameCompoundUniqueInput = {
    userId: string
    name: string
  }

  export type GoalCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type GoalMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type GoalMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SessionTemplateUserIdNameCompoundUniqueInput = {
    userId: string
    name: string
  }

  export type SessionTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    showMetronome?: SortOrder
    showSongPicker?: SortOrder
    showGoalPicker?: SortOrder
    checklistItems?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    showMetronome?: SortOrder
    showSongPicker?: SortOrder
    showGoalPicker?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    showMetronome?: SortOrder
    showSongPicker?: SortOrder
    showGoalPicker?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type SongNullableScalarRelationFilter = {
    is?: SongWhereInput | null
    isNot?: SongWhereInput | null
  }

  export type TagListRelationFilter = {
    every?: TagWhereInput
    some?: TagWhereInput
    none?: TagWhereInput
  }

  export type RecordingListRelationFilter = {
    every?: RecordingWhereInput
    some?: RecordingWhereInput
    none?: RecordingWhereInput
  }

  export type InstructorNullableScalarRelationFilter = {
    is?: InstructorWhereInput | null
    isNot?: InstructorWhereInput | null
  }

  export type GoalNullableScalarRelationFilter = {
    is?: GoalWhereInput | null
    isNot?: GoalWhereInput | null
  }

  export type SessionTemplateNullableScalarRelationFilter = {
    is?: SessionTemplateWhereInput | null
    isNot?: SessionTemplateWhereInput | null
  }

  export type TagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RecordingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    topic?: SortOrder
    notes?: SortOrder
    bpm?: SortOrder
    instrument?: SortOrder
    intention?: SortOrder
    intentionMet?: SortOrder
    mood?: SortOrder
    focus?: SortOrder
    isFavorited?: SortOrder
    isPublic?: SortOrder
    songId?: SortOrder
    instructorId?: SortOrder
    goalId?: SortOrder
    pickup?: SortOrder
    templateId?: SortOrder
    checklistAnswers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    duration?: SortOrder
    bpm?: SortOrder
    mood?: SortOrder
    focus?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    topic?: SortOrder
    notes?: SortOrder
    bpm?: SortOrder
    instrument?: SortOrder
    intention?: SortOrder
    intentionMet?: SortOrder
    mood?: SortOrder
    focus?: SortOrder
    isFavorited?: SortOrder
    isPublic?: SortOrder
    songId?: SortOrder
    instructorId?: SortOrder
    goalId?: SortOrder
    pickup?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    topic?: SortOrder
    notes?: SortOrder
    bpm?: SortOrder
    instrument?: SortOrder
    intention?: SortOrder
    intentionMet?: SortOrder
    mood?: SortOrder
    focus?: SortOrder
    isFavorited?: SortOrder
    isPublic?: SortOrder
    songId?: SortOrder
    instructorId?: SortOrder
    goalId?: SortOrder
    pickup?: SortOrder
    templateId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    duration?: SortOrder
    bpm?: SortOrder
    mood?: SortOrder
    focus?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type SessionCreateNestedManyWithoutSongInput = {
    create?: XOR<SessionCreateWithoutSongInput, SessionUncheckedCreateWithoutSongInput> | SessionCreateWithoutSongInput[] | SessionUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutSongInput | SessionCreateOrConnectWithoutSongInput[]
    createMany?: SessionCreateManySongInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SongVideoCreateNestedManyWithoutSongInput = {
    create?: XOR<SongVideoCreateWithoutSongInput, SongVideoUncheckedCreateWithoutSongInput> | SongVideoCreateWithoutSongInput[] | SongVideoUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SongVideoCreateOrConnectWithoutSongInput | SongVideoCreateOrConnectWithoutSongInput[]
    createMany?: SongVideoCreateManySongInputEnvelope
    connect?: SongVideoWhereUniqueInput | SongVideoWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutSongInput = {
    create?: XOR<SessionCreateWithoutSongInput, SessionUncheckedCreateWithoutSongInput> | SessionCreateWithoutSongInput[] | SessionUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutSongInput | SessionCreateOrConnectWithoutSongInput[]
    createMany?: SessionCreateManySongInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SongVideoUncheckedCreateNestedManyWithoutSongInput = {
    create?: XOR<SongVideoCreateWithoutSongInput, SongVideoUncheckedCreateWithoutSongInput> | SongVideoCreateWithoutSongInput[] | SongVideoUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SongVideoCreateOrConnectWithoutSongInput | SongVideoCreateOrConnectWithoutSongInput[]
    createMany?: SongVideoCreateManySongInputEnvelope
    connect?: SongVideoWhereUniqueInput | SongVideoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableEnumKeyFieldUpdateOperationsInput = {
    set?: $Enums.Key | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumTuningFieldUpdateOperationsInput = {
    set?: $Enums.Tuning
  }

  export type NullableEnumThumbStyleFieldUpdateOperationsInput = {
    set?: $Enums.ThumbStyle | null
  }

  export type EnumSongStatusFieldUpdateOperationsInput = {
    set?: $Enums.SongStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SessionUpdateManyWithoutSongNestedInput = {
    create?: XOR<SessionCreateWithoutSongInput, SessionUncheckedCreateWithoutSongInput> | SessionCreateWithoutSongInput[] | SessionUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutSongInput | SessionCreateOrConnectWithoutSongInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutSongInput | SessionUpsertWithWhereUniqueWithoutSongInput[]
    createMany?: SessionCreateManySongInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutSongInput | SessionUpdateWithWhereUniqueWithoutSongInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutSongInput | SessionUpdateManyWithWhereWithoutSongInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SongVideoUpdateManyWithoutSongNestedInput = {
    create?: XOR<SongVideoCreateWithoutSongInput, SongVideoUncheckedCreateWithoutSongInput> | SongVideoCreateWithoutSongInput[] | SongVideoUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SongVideoCreateOrConnectWithoutSongInput | SongVideoCreateOrConnectWithoutSongInput[]
    upsert?: SongVideoUpsertWithWhereUniqueWithoutSongInput | SongVideoUpsertWithWhereUniqueWithoutSongInput[]
    createMany?: SongVideoCreateManySongInputEnvelope
    set?: SongVideoWhereUniqueInput | SongVideoWhereUniqueInput[]
    disconnect?: SongVideoWhereUniqueInput | SongVideoWhereUniqueInput[]
    delete?: SongVideoWhereUniqueInput | SongVideoWhereUniqueInput[]
    connect?: SongVideoWhereUniqueInput | SongVideoWhereUniqueInput[]
    update?: SongVideoUpdateWithWhereUniqueWithoutSongInput | SongVideoUpdateWithWhereUniqueWithoutSongInput[]
    updateMany?: SongVideoUpdateManyWithWhereWithoutSongInput | SongVideoUpdateManyWithWhereWithoutSongInput[]
    deleteMany?: SongVideoScalarWhereInput | SongVideoScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutSongNestedInput = {
    create?: XOR<SessionCreateWithoutSongInput, SessionUncheckedCreateWithoutSongInput> | SessionCreateWithoutSongInput[] | SessionUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutSongInput | SessionCreateOrConnectWithoutSongInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutSongInput | SessionUpsertWithWhereUniqueWithoutSongInput[]
    createMany?: SessionCreateManySongInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutSongInput | SessionUpdateWithWhereUniqueWithoutSongInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutSongInput | SessionUpdateManyWithWhereWithoutSongInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SongVideoUncheckedUpdateManyWithoutSongNestedInput = {
    create?: XOR<SongVideoCreateWithoutSongInput, SongVideoUncheckedCreateWithoutSongInput> | SongVideoCreateWithoutSongInput[] | SongVideoUncheckedCreateWithoutSongInput[]
    connectOrCreate?: SongVideoCreateOrConnectWithoutSongInput | SongVideoCreateOrConnectWithoutSongInput[]
    upsert?: SongVideoUpsertWithWhereUniqueWithoutSongInput | SongVideoUpsertWithWhereUniqueWithoutSongInput[]
    createMany?: SongVideoCreateManySongInputEnvelope
    set?: SongVideoWhereUniqueInput | SongVideoWhereUniqueInput[]
    disconnect?: SongVideoWhereUniqueInput | SongVideoWhereUniqueInput[]
    delete?: SongVideoWhereUniqueInput | SongVideoWhereUniqueInput[]
    connect?: SongVideoWhereUniqueInput | SongVideoWhereUniqueInput[]
    update?: SongVideoUpdateWithWhereUniqueWithoutSongInput | SongVideoUpdateWithWhereUniqueWithoutSongInput[]
    updateMany?: SongVideoUpdateManyWithWhereWithoutSongInput | SongVideoUpdateManyWithWhereWithoutSongInput[]
    deleteMany?: SongVideoScalarWhereInput | SongVideoScalarWhereInput[]
  }

  export type SongCreateNestedOneWithoutVideosInput = {
    create?: XOR<SongCreateWithoutVideosInput, SongUncheckedCreateWithoutVideosInput>
    connectOrCreate?: SongCreateOrConnectWithoutVideosInput
    connect?: SongWhereUniqueInput
  }

  export type SongUpdateOneRequiredWithoutVideosNestedInput = {
    create?: XOR<SongCreateWithoutVideosInput, SongUncheckedCreateWithoutVideosInput>
    connectOrCreate?: SongCreateOrConnectWithoutVideosInput
    upsert?: SongUpsertWithoutVideosInput
    connect?: SongWhereUniqueInput
    update?: XOR<XOR<SongUpdateToOneWithWhereWithoutVideosInput, SongUpdateWithoutVideosInput>, SongUncheckedUpdateWithoutVideosInput>
  }

  export type SessionCreateNestedManyWithoutTagsInput = {
    create?: XOR<SessionCreateWithoutTagsInput, SessionUncheckedCreateWithoutTagsInput> | SessionCreateWithoutTagsInput[] | SessionUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutTagsInput | SessionCreateOrConnectWithoutTagsInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<SessionCreateWithoutTagsInput, SessionUncheckedCreateWithoutTagsInput> | SessionCreateWithoutTagsInput[] | SessionUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutTagsInput | SessionCreateOrConnectWithoutTagsInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionUpdateManyWithoutTagsNestedInput = {
    create?: XOR<SessionCreateWithoutTagsInput, SessionUncheckedCreateWithoutTagsInput> | SessionCreateWithoutTagsInput[] | SessionUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutTagsInput | SessionCreateOrConnectWithoutTagsInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutTagsInput | SessionUpsertWithWhereUniqueWithoutTagsInput[]
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutTagsInput | SessionUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutTagsInput | SessionUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<SessionCreateWithoutTagsInput, SessionUncheckedCreateWithoutTagsInput> | SessionCreateWithoutTagsInput[] | SessionUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutTagsInput | SessionCreateOrConnectWithoutTagsInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutTagsInput | SessionUpsertWithWhereUniqueWithoutTagsInput[]
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutTagsInput | SessionUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutTagsInput | SessionUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionCreateNestedOneWithoutRecordingsInput = {
    create?: XOR<SessionCreateWithoutRecordingsInput, SessionUncheckedCreateWithoutRecordingsInput>
    connectOrCreate?: SessionCreateOrConnectWithoutRecordingsInput
    connect?: SessionWhereUniqueInput
  }

  export type SessionUpdateOneRequiredWithoutRecordingsNestedInput = {
    create?: XOR<SessionCreateWithoutRecordingsInput, SessionUncheckedCreateWithoutRecordingsInput>
    connectOrCreate?: SessionCreateOrConnectWithoutRecordingsInput
    upsert?: SessionUpsertWithoutRecordingsInput
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutRecordingsInput, SessionUpdateWithoutRecordingsInput>, SessionUncheckedUpdateWithoutRecordingsInput>
  }

  export type SessionCreateNestedManyWithoutInstructorInput = {
    create?: XOR<SessionCreateWithoutInstructorInput, SessionUncheckedCreateWithoutInstructorInput> | SessionCreateWithoutInstructorInput[] | SessionUncheckedCreateWithoutInstructorInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutInstructorInput | SessionCreateOrConnectWithoutInstructorInput[]
    createMany?: SessionCreateManyInstructorInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutInstructorInput = {
    create?: XOR<SessionCreateWithoutInstructorInput, SessionUncheckedCreateWithoutInstructorInput> | SessionCreateWithoutInstructorInput[] | SessionUncheckedCreateWithoutInstructorInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutInstructorInput | SessionCreateOrConnectWithoutInstructorInput[]
    createMany?: SessionCreateManyInstructorInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionUpdateManyWithoutInstructorNestedInput = {
    create?: XOR<SessionCreateWithoutInstructorInput, SessionUncheckedCreateWithoutInstructorInput> | SessionCreateWithoutInstructorInput[] | SessionUncheckedCreateWithoutInstructorInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutInstructorInput | SessionCreateOrConnectWithoutInstructorInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutInstructorInput | SessionUpsertWithWhereUniqueWithoutInstructorInput[]
    createMany?: SessionCreateManyInstructorInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutInstructorInput | SessionUpdateWithWhereUniqueWithoutInstructorInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutInstructorInput | SessionUpdateManyWithWhereWithoutInstructorInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutInstructorNestedInput = {
    create?: XOR<SessionCreateWithoutInstructorInput, SessionUncheckedCreateWithoutInstructorInput> | SessionCreateWithoutInstructorInput[] | SessionUncheckedCreateWithoutInstructorInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutInstructorInput | SessionCreateOrConnectWithoutInstructorInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutInstructorInput | SessionUpsertWithWhereUniqueWithoutInstructorInput[]
    createMany?: SessionCreateManyInstructorInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutInstructorInput | SessionUpdateWithWhereUniqueWithoutInstructorInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutInstructorInput | SessionUpdateManyWithWhereWithoutInstructorInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionCreateNestedManyWithoutGoalInput = {
    create?: XOR<SessionCreateWithoutGoalInput, SessionUncheckedCreateWithoutGoalInput> | SessionCreateWithoutGoalInput[] | SessionUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutGoalInput | SessionCreateOrConnectWithoutGoalInput[]
    createMany?: SessionCreateManyGoalInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutGoalInput = {
    create?: XOR<SessionCreateWithoutGoalInput, SessionUncheckedCreateWithoutGoalInput> | SessionCreateWithoutGoalInput[] | SessionUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutGoalInput | SessionCreateOrConnectWithoutGoalInput[]
    createMany?: SessionCreateManyGoalInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionUpdateManyWithoutGoalNestedInput = {
    create?: XOR<SessionCreateWithoutGoalInput, SessionUncheckedCreateWithoutGoalInput> | SessionCreateWithoutGoalInput[] | SessionUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutGoalInput | SessionCreateOrConnectWithoutGoalInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutGoalInput | SessionUpsertWithWhereUniqueWithoutGoalInput[]
    createMany?: SessionCreateManyGoalInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutGoalInput | SessionUpdateWithWhereUniqueWithoutGoalInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutGoalInput | SessionUpdateManyWithWhereWithoutGoalInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutGoalNestedInput = {
    create?: XOR<SessionCreateWithoutGoalInput, SessionUncheckedCreateWithoutGoalInput> | SessionCreateWithoutGoalInput[] | SessionUncheckedCreateWithoutGoalInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutGoalInput | SessionCreateOrConnectWithoutGoalInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutGoalInput | SessionUpsertWithWhereUniqueWithoutGoalInput[]
    createMany?: SessionCreateManyGoalInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutGoalInput | SessionUpdateWithWhereUniqueWithoutGoalInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutGoalInput | SessionUpdateManyWithWhereWithoutGoalInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionCreateNestedManyWithoutTemplateInput = {
    create?: XOR<SessionCreateWithoutTemplateInput, SessionUncheckedCreateWithoutTemplateInput> | SessionCreateWithoutTemplateInput[] | SessionUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutTemplateInput | SessionCreateOrConnectWithoutTemplateInput[]
    createMany?: SessionCreateManyTemplateInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<SessionCreateWithoutTemplateInput, SessionUncheckedCreateWithoutTemplateInput> | SessionCreateWithoutTemplateInput[] | SessionUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutTemplateInput | SessionCreateOrConnectWithoutTemplateInput[]
    createMany?: SessionCreateManyTemplateInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type SessionUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<SessionCreateWithoutTemplateInput, SessionUncheckedCreateWithoutTemplateInput> | SessionCreateWithoutTemplateInput[] | SessionUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutTemplateInput | SessionCreateOrConnectWithoutTemplateInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutTemplateInput | SessionUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: SessionCreateManyTemplateInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutTemplateInput | SessionUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutTemplateInput | SessionUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<SessionCreateWithoutTemplateInput, SessionUncheckedCreateWithoutTemplateInput> | SessionCreateWithoutTemplateInput[] | SessionUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutTemplateInput | SessionCreateOrConnectWithoutTemplateInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutTemplateInput | SessionUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: SessionCreateManyTemplateInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutTemplateInput | SessionUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutTemplateInput | SessionUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SongCreateNestedOneWithoutSessionsInput = {
    create?: XOR<SongCreateWithoutSessionsInput, SongUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: SongCreateOrConnectWithoutSessionsInput
    connect?: SongWhereUniqueInput
  }

  export type TagCreateNestedManyWithoutSessionsInput = {
    create?: XOR<TagCreateWithoutSessionsInput, TagUncheckedCreateWithoutSessionsInput> | TagCreateWithoutSessionsInput[] | TagUncheckedCreateWithoutSessionsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutSessionsInput | TagCreateOrConnectWithoutSessionsInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type RecordingCreateNestedManyWithoutSessionInput = {
    create?: XOR<RecordingCreateWithoutSessionInput, RecordingUncheckedCreateWithoutSessionInput> | RecordingCreateWithoutSessionInput[] | RecordingUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RecordingCreateOrConnectWithoutSessionInput | RecordingCreateOrConnectWithoutSessionInput[]
    createMany?: RecordingCreateManySessionInputEnvelope
    connect?: RecordingWhereUniqueInput | RecordingWhereUniqueInput[]
  }

  export type InstructorCreateNestedOneWithoutSessionsInput = {
    create?: XOR<InstructorCreateWithoutSessionsInput, InstructorUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: InstructorCreateOrConnectWithoutSessionsInput
    connect?: InstructorWhereUniqueInput
  }

  export type GoalCreateNestedOneWithoutSessionsInput = {
    create?: XOR<GoalCreateWithoutSessionsInput, GoalUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: GoalCreateOrConnectWithoutSessionsInput
    connect?: GoalWhereUniqueInput
  }

  export type SessionTemplateCreateNestedOneWithoutSessionsInput = {
    create?: XOR<SessionTemplateCreateWithoutSessionsInput, SessionTemplateUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: SessionTemplateCreateOrConnectWithoutSessionsInput
    connect?: SessionTemplateWhereUniqueInput
  }

  export type TagUncheckedCreateNestedManyWithoutSessionsInput = {
    create?: XOR<TagCreateWithoutSessionsInput, TagUncheckedCreateWithoutSessionsInput> | TagCreateWithoutSessionsInput[] | TagUncheckedCreateWithoutSessionsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutSessionsInput | TagCreateOrConnectWithoutSessionsInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
  }

  export type RecordingUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<RecordingCreateWithoutSessionInput, RecordingUncheckedCreateWithoutSessionInput> | RecordingCreateWithoutSessionInput[] | RecordingUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RecordingCreateOrConnectWithoutSessionInput | RecordingCreateOrConnectWithoutSessionInput[]
    createMany?: RecordingCreateManySessionInputEnvelope
    connect?: RecordingWhereUniqueInput | RecordingWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type SongUpdateOneWithoutSessionsNestedInput = {
    create?: XOR<SongCreateWithoutSessionsInput, SongUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: SongCreateOrConnectWithoutSessionsInput
    upsert?: SongUpsertWithoutSessionsInput
    disconnect?: SongWhereInput | boolean
    delete?: SongWhereInput | boolean
    connect?: SongWhereUniqueInput
    update?: XOR<XOR<SongUpdateToOneWithWhereWithoutSessionsInput, SongUpdateWithoutSessionsInput>, SongUncheckedUpdateWithoutSessionsInput>
  }

  export type TagUpdateManyWithoutSessionsNestedInput = {
    create?: XOR<TagCreateWithoutSessionsInput, TagUncheckedCreateWithoutSessionsInput> | TagCreateWithoutSessionsInput[] | TagUncheckedCreateWithoutSessionsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutSessionsInput | TagCreateOrConnectWithoutSessionsInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutSessionsInput | TagUpsertWithWhereUniqueWithoutSessionsInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutSessionsInput | TagUpdateWithWhereUniqueWithoutSessionsInput[]
    updateMany?: TagUpdateManyWithWhereWithoutSessionsInput | TagUpdateManyWithWhereWithoutSessionsInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type RecordingUpdateManyWithoutSessionNestedInput = {
    create?: XOR<RecordingCreateWithoutSessionInput, RecordingUncheckedCreateWithoutSessionInput> | RecordingCreateWithoutSessionInput[] | RecordingUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RecordingCreateOrConnectWithoutSessionInput | RecordingCreateOrConnectWithoutSessionInput[]
    upsert?: RecordingUpsertWithWhereUniqueWithoutSessionInput | RecordingUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: RecordingCreateManySessionInputEnvelope
    set?: RecordingWhereUniqueInput | RecordingWhereUniqueInput[]
    disconnect?: RecordingWhereUniqueInput | RecordingWhereUniqueInput[]
    delete?: RecordingWhereUniqueInput | RecordingWhereUniqueInput[]
    connect?: RecordingWhereUniqueInput | RecordingWhereUniqueInput[]
    update?: RecordingUpdateWithWhereUniqueWithoutSessionInput | RecordingUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: RecordingUpdateManyWithWhereWithoutSessionInput | RecordingUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: RecordingScalarWhereInput | RecordingScalarWhereInput[]
  }

  export type InstructorUpdateOneWithoutSessionsNestedInput = {
    create?: XOR<InstructorCreateWithoutSessionsInput, InstructorUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: InstructorCreateOrConnectWithoutSessionsInput
    upsert?: InstructorUpsertWithoutSessionsInput
    disconnect?: InstructorWhereInput | boolean
    delete?: InstructorWhereInput | boolean
    connect?: InstructorWhereUniqueInput
    update?: XOR<XOR<InstructorUpdateToOneWithWhereWithoutSessionsInput, InstructorUpdateWithoutSessionsInput>, InstructorUncheckedUpdateWithoutSessionsInput>
  }

  export type GoalUpdateOneWithoutSessionsNestedInput = {
    create?: XOR<GoalCreateWithoutSessionsInput, GoalUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: GoalCreateOrConnectWithoutSessionsInput
    upsert?: GoalUpsertWithoutSessionsInput
    disconnect?: GoalWhereInput | boolean
    delete?: GoalWhereInput | boolean
    connect?: GoalWhereUniqueInput
    update?: XOR<XOR<GoalUpdateToOneWithWhereWithoutSessionsInput, GoalUpdateWithoutSessionsInput>, GoalUncheckedUpdateWithoutSessionsInput>
  }

  export type SessionTemplateUpdateOneWithoutSessionsNestedInput = {
    create?: XOR<SessionTemplateCreateWithoutSessionsInput, SessionTemplateUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: SessionTemplateCreateOrConnectWithoutSessionsInput
    upsert?: SessionTemplateUpsertWithoutSessionsInput
    disconnect?: SessionTemplateWhereInput | boolean
    delete?: SessionTemplateWhereInput | boolean
    connect?: SessionTemplateWhereUniqueInput
    update?: XOR<XOR<SessionTemplateUpdateToOneWithWhereWithoutSessionsInput, SessionTemplateUpdateWithoutSessionsInput>, SessionTemplateUncheckedUpdateWithoutSessionsInput>
  }

  export type TagUncheckedUpdateManyWithoutSessionsNestedInput = {
    create?: XOR<TagCreateWithoutSessionsInput, TagUncheckedCreateWithoutSessionsInput> | TagCreateWithoutSessionsInput[] | TagUncheckedCreateWithoutSessionsInput[]
    connectOrCreate?: TagCreateOrConnectWithoutSessionsInput | TagCreateOrConnectWithoutSessionsInput[]
    upsert?: TagUpsertWithWhereUniqueWithoutSessionsInput | TagUpsertWithWhereUniqueWithoutSessionsInput[]
    set?: TagWhereUniqueInput | TagWhereUniqueInput[]
    disconnect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    delete?: TagWhereUniqueInput | TagWhereUniqueInput[]
    connect?: TagWhereUniqueInput | TagWhereUniqueInput[]
    update?: TagUpdateWithWhereUniqueWithoutSessionsInput | TagUpdateWithWhereUniqueWithoutSessionsInput[]
    updateMany?: TagUpdateManyWithWhereWithoutSessionsInput | TagUpdateManyWithWhereWithoutSessionsInput[]
    deleteMany?: TagScalarWhereInput | TagScalarWhereInput[]
  }

  export type RecordingUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<RecordingCreateWithoutSessionInput, RecordingUncheckedCreateWithoutSessionInput> | RecordingCreateWithoutSessionInput[] | RecordingUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: RecordingCreateOrConnectWithoutSessionInput | RecordingCreateOrConnectWithoutSessionInput[]
    upsert?: RecordingUpsertWithWhereUniqueWithoutSessionInput | RecordingUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: RecordingCreateManySessionInputEnvelope
    set?: RecordingWhereUniqueInput | RecordingWhereUniqueInput[]
    disconnect?: RecordingWhereUniqueInput | RecordingWhereUniqueInput[]
    delete?: RecordingWhereUniqueInput | RecordingWhereUniqueInput[]
    connect?: RecordingWhereUniqueInput | RecordingWhereUniqueInput[]
    update?: RecordingUpdateWithWhereUniqueWithoutSessionInput | RecordingUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: RecordingUpdateManyWithWhereWithoutSessionInput | RecordingUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: RecordingScalarWhereInput | RecordingScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumKeyNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Key | EnumKeyFieldRefInput<$PrismaModel> | null
    in?: $Enums.Key[] | ListEnumKeyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Key[] | ListEnumKeyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumKeyNullableFilter<$PrismaModel> | $Enums.Key | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumTuningFilter<$PrismaModel = never> = {
    equals?: $Enums.Tuning | EnumTuningFieldRefInput<$PrismaModel>
    in?: $Enums.Tuning[] | ListEnumTuningFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tuning[] | ListEnumTuningFieldRefInput<$PrismaModel>
    not?: NestedEnumTuningFilter<$PrismaModel> | $Enums.Tuning
  }

  export type NestedEnumThumbStyleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.ThumbStyle | EnumThumbStyleFieldRefInput<$PrismaModel> | null
    in?: $Enums.ThumbStyle[] | ListEnumThumbStyleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ThumbStyle[] | ListEnumThumbStyleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumThumbStyleNullableFilter<$PrismaModel> | $Enums.ThumbStyle | null
  }

  export type NestedEnumSongStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SongStatus | EnumSongStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SongStatus[] | ListEnumSongStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SongStatus[] | ListEnumSongStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSongStatusFilter<$PrismaModel> | $Enums.SongStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumKeyNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Key | EnumKeyFieldRefInput<$PrismaModel> | null
    in?: $Enums.Key[] | ListEnumKeyFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.Key[] | ListEnumKeyFieldRefInput<$PrismaModel> | null
    not?: NestedEnumKeyNullableWithAggregatesFilter<$PrismaModel> | $Enums.Key | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumKeyNullableFilter<$PrismaModel>
    _max?: NestedEnumKeyNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumTuningWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Tuning | EnumTuningFieldRefInput<$PrismaModel>
    in?: $Enums.Tuning[] | ListEnumTuningFieldRefInput<$PrismaModel>
    notIn?: $Enums.Tuning[] | ListEnumTuningFieldRefInput<$PrismaModel>
    not?: NestedEnumTuningWithAggregatesFilter<$PrismaModel> | $Enums.Tuning
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTuningFilter<$PrismaModel>
    _max?: NestedEnumTuningFilter<$PrismaModel>
  }

  export type NestedEnumThumbStyleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ThumbStyle | EnumThumbStyleFieldRefInput<$PrismaModel> | null
    in?: $Enums.ThumbStyle[] | ListEnumThumbStyleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.ThumbStyle[] | ListEnumThumbStyleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumThumbStyleNullableWithAggregatesFilter<$PrismaModel> | $Enums.ThumbStyle | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumThumbStyleNullableFilter<$PrismaModel>
    _max?: NestedEnumThumbStyleNullableFilter<$PrismaModel>
  }

  export type NestedEnumSongStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SongStatus | EnumSongStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SongStatus[] | ListEnumSongStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SongStatus[] | ListEnumSongStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSongStatusWithAggregatesFilter<$PrismaModel> | $Enums.SongStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSongStatusFilter<$PrismaModel>
    _max?: NestedEnumSongStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type SessionCreateWithoutSongInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    pickup?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagCreateNestedManyWithoutSessionsInput
    recordings?: RecordingCreateNestedManyWithoutSessionInput
    instructor?: InstructorCreateNestedOneWithoutSessionsInput
    goal?: GoalCreateNestedOneWithoutSessionsInput
    template?: SessionTemplateCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutSongInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    instructorId?: string | null
    goalId?: string | null
    pickup?: string | null
    templateId?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutSessionsInput
    recordings?: RecordingUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutSongInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutSongInput, SessionUncheckedCreateWithoutSongInput>
  }

  export type SessionCreateManySongInputEnvelope = {
    data: SessionCreateManySongInput | SessionCreateManySongInput[]
    skipDuplicates?: boolean
  }

  export type SongVideoCreateWithoutSongInput = {
    id?: string
    label: string
    url: string
    createdAt?: Date | string
  }

  export type SongVideoUncheckedCreateWithoutSongInput = {
    id?: string
    label: string
    url: string
    createdAt?: Date | string
  }

  export type SongVideoCreateOrConnectWithoutSongInput = {
    where: SongVideoWhereUniqueInput
    create: XOR<SongVideoCreateWithoutSongInput, SongVideoUncheckedCreateWithoutSongInput>
  }

  export type SongVideoCreateManySongInputEnvelope = {
    data: SongVideoCreateManySongInput | SongVideoCreateManySongInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutSongInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutSongInput, SessionUncheckedUpdateWithoutSongInput>
    create: XOR<SessionCreateWithoutSongInput, SessionUncheckedCreateWithoutSongInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutSongInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutSongInput, SessionUncheckedUpdateWithoutSongInput>
  }

  export type SessionUpdateManyWithWhereWithoutSongInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutSongInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    date?: DateTimeFilter<"Session"> | Date | string
    duration?: IntFilter<"Session"> | number
    topic?: StringNullableFilter<"Session"> | string | null
    notes?: StringNullableFilter<"Session"> | string | null
    bpm?: IntNullableFilter<"Session"> | number | null
    instrument?: StringNullableFilter<"Session"> | string | null
    intention?: StringNullableFilter<"Session"> | string | null
    intentionMet?: BoolNullableFilter<"Session"> | boolean | null
    mood?: IntNullableFilter<"Session"> | number | null
    focus?: IntNullableFilter<"Session"> | number | null
    isFavorited?: BoolFilter<"Session"> | boolean
    isPublic?: BoolFilter<"Session"> | boolean
    songId?: StringNullableFilter<"Session"> | string | null
    instructorId?: StringNullableFilter<"Session"> | string | null
    goalId?: StringNullableFilter<"Session"> | string | null
    pickup?: StringNullableFilter<"Session"> | string | null
    templateId?: StringNullableFilter<"Session"> | string | null
    checklistAnswers?: JsonNullableFilter<"Session">
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type SongVideoUpsertWithWhereUniqueWithoutSongInput = {
    where: SongVideoWhereUniqueInput
    update: XOR<SongVideoUpdateWithoutSongInput, SongVideoUncheckedUpdateWithoutSongInput>
    create: XOR<SongVideoCreateWithoutSongInput, SongVideoUncheckedCreateWithoutSongInput>
  }

  export type SongVideoUpdateWithWhereUniqueWithoutSongInput = {
    where: SongVideoWhereUniqueInput
    data: XOR<SongVideoUpdateWithoutSongInput, SongVideoUncheckedUpdateWithoutSongInput>
  }

  export type SongVideoUpdateManyWithWhereWithoutSongInput = {
    where: SongVideoScalarWhereInput
    data: XOR<SongVideoUpdateManyMutationInput, SongVideoUncheckedUpdateManyWithoutSongInput>
  }

  export type SongVideoScalarWhereInput = {
    AND?: SongVideoScalarWhereInput | SongVideoScalarWhereInput[]
    OR?: SongVideoScalarWhereInput[]
    NOT?: SongVideoScalarWhereInput | SongVideoScalarWhereInput[]
    id?: StringFilter<"SongVideo"> | string
    songId?: StringFilter<"SongVideo"> | string
    label?: StringFilter<"SongVideo"> | string
    url?: StringFilter<"SongVideo"> | string
    createdAt?: DateTimeFilter<"SongVideo"> | Date | string
  }

  export type SongCreateWithoutVideosInput = {
    id?: string
    userId: string
    title: string
    key?: $Enums.Key | null
    capo?: number | null
    tuning?: $Enums.Tuning
    thumbStyle?: $Enums.ThumbStyle | null
    status?: $Enums.SongStatus
    currentBlocker?: string | null
    createdAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutSongInput
  }

  export type SongUncheckedCreateWithoutVideosInput = {
    id?: string
    userId: string
    title: string
    key?: $Enums.Key | null
    capo?: number | null
    tuning?: $Enums.Tuning
    thumbStyle?: $Enums.ThumbStyle | null
    status?: $Enums.SongStatus
    currentBlocker?: string | null
    createdAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutSongInput
  }

  export type SongCreateOrConnectWithoutVideosInput = {
    where: SongWhereUniqueInput
    create: XOR<SongCreateWithoutVideosInput, SongUncheckedCreateWithoutVideosInput>
  }

  export type SongUpsertWithoutVideosInput = {
    update: XOR<SongUpdateWithoutVideosInput, SongUncheckedUpdateWithoutVideosInput>
    create: XOR<SongCreateWithoutVideosInput, SongUncheckedCreateWithoutVideosInput>
    where?: SongWhereInput
  }

  export type SongUpdateToOneWithWhereWithoutVideosInput = {
    where?: SongWhereInput
    data: XOR<SongUpdateWithoutVideosInput, SongUncheckedUpdateWithoutVideosInput>
  }

  export type SongUpdateWithoutVideosInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    key?: NullableEnumKeyFieldUpdateOperationsInput | $Enums.Key | null
    capo?: NullableIntFieldUpdateOperationsInput | number | null
    tuning?: EnumTuningFieldUpdateOperationsInput | $Enums.Tuning
    thumbStyle?: NullableEnumThumbStyleFieldUpdateOperationsInput | $Enums.ThumbStyle | null
    status?: EnumSongStatusFieldUpdateOperationsInput | $Enums.SongStatus
    currentBlocker?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutSongNestedInput
  }

  export type SongUncheckedUpdateWithoutVideosInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    key?: NullableEnumKeyFieldUpdateOperationsInput | $Enums.Key | null
    capo?: NullableIntFieldUpdateOperationsInput | number | null
    tuning?: EnumTuningFieldUpdateOperationsInput | $Enums.Tuning
    thumbStyle?: NullableEnumThumbStyleFieldUpdateOperationsInput | $Enums.ThumbStyle | null
    status?: EnumSongStatusFieldUpdateOperationsInput | $Enums.SongStatus
    currentBlocker?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutSongNestedInput
  }

  export type SessionCreateWithoutTagsInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    pickup?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    song?: SongCreateNestedOneWithoutSessionsInput
    recordings?: RecordingCreateNestedManyWithoutSessionInput
    instructor?: InstructorCreateNestedOneWithoutSessionsInput
    goal?: GoalCreateNestedOneWithoutSessionsInput
    template?: SessionTemplateCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutTagsInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    songId?: string | null
    instructorId?: string | null
    goalId?: string | null
    pickup?: string | null
    templateId?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    recordings?: RecordingUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutTagsInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutTagsInput, SessionUncheckedCreateWithoutTagsInput>
  }

  export type SessionUpsertWithWhereUniqueWithoutTagsInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutTagsInput, SessionUncheckedUpdateWithoutTagsInput>
    create: XOR<SessionCreateWithoutTagsInput, SessionUncheckedCreateWithoutTagsInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutTagsInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutTagsInput, SessionUncheckedUpdateWithoutTagsInput>
  }

  export type SessionUpdateManyWithWhereWithoutTagsInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutTagsInput>
  }

  export type SessionCreateWithoutRecordingsInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    pickup?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    song?: SongCreateNestedOneWithoutSessionsInput
    tags?: TagCreateNestedManyWithoutSessionsInput
    instructor?: InstructorCreateNestedOneWithoutSessionsInput
    goal?: GoalCreateNestedOneWithoutSessionsInput
    template?: SessionTemplateCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutRecordingsInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    songId?: string | null
    instructorId?: string | null
    goalId?: string | null
    pickup?: string | null
    templateId?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutSessionsInput
  }

  export type SessionCreateOrConnectWithoutRecordingsInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutRecordingsInput, SessionUncheckedCreateWithoutRecordingsInput>
  }

  export type SessionUpsertWithoutRecordingsInput = {
    update: XOR<SessionUpdateWithoutRecordingsInput, SessionUncheckedUpdateWithoutRecordingsInput>
    create: XOR<SessionCreateWithoutRecordingsInput, SessionUncheckedCreateWithoutRecordingsInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutRecordingsInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutRecordingsInput, SessionUncheckedUpdateWithoutRecordingsInput>
  }

  export type SessionUpdateWithoutRecordingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    song?: SongUpdateOneWithoutSessionsNestedInput
    tags?: TagUpdateManyWithoutSessionsNestedInput
    instructor?: InstructorUpdateOneWithoutSessionsNestedInput
    goal?: GoalUpdateOneWithoutSessionsNestedInput
    template?: SessionTemplateUpdateOneWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutRecordingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    songId?: NullableStringFieldUpdateOperationsInput | string | null
    instructorId?: NullableStringFieldUpdateOperationsInput | string | null
    goalId?: NullableStringFieldUpdateOperationsInput | string | null
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutSessionsNestedInput
  }

  export type SessionCreateWithoutInstructorInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    pickup?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    song?: SongCreateNestedOneWithoutSessionsInput
    tags?: TagCreateNestedManyWithoutSessionsInput
    recordings?: RecordingCreateNestedManyWithoutSessionInput
    goal?: GoalCreateNestedOneWithoutSessionsInput
    template?: SessionTemplateCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutInstructorInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    songId?: string | null
    goalId?: string | null
    pickup?: string | null
    templateId?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutSessionsInput
    recordings?: RecordingUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutInstructorInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutInstructorInput, SessionUncheckedCreateWithoutInstructorInput>
  }

  export type SessionCreateManyInstructorInputEnvelope = {
    data: SessionCreateManyInstructorInput | SessionCreateManyInstructorInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutInstructorInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutInstructorInput, SessionUncheckedUpdateWithoutInstructorInput>
    create: XOR<SessionCreateWithoutInstructorInput, SessionUncheckedCreateWithoutInstructorInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutInstructorInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutInstructorInput, SessionUncheckedUpdateWithoutInstructorInput>
  }

  export type SessionUpdateManyWithWhereWithoutInstructorInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutInstructorInput>
  }

  export type SessionCreateWithoutGoalInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    pickup?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    song?: SongCreateNestedOneWithoutSessionsInput
    tags?: TagCreateNestedManyWithoutSessionsInput
    recordings?: RecordingCreateNestedManyWithoutSessionInput
    instructor?: InstructorCreateNestedOneWithoutSessionsInput
    template?: SessionTemplateCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutGoalInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    songId?: string | null
    instructorId?: string | null
    pickup?: string | null
    templateId?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutSessionsInput
    recordings?: RecordingUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutGoalInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutGoalInput, SessionUncheckedCreateWithoutGoalInput>
  }

  export type SessionCreateManyGoalInputEnvelope = {
    data: SessionCreateManyGoalInput | SessionCreateManyGoalInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutGoalInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutGoalInput, SessionUncheckedUpdateWithoutGoalInput>
    create: XOR<SessionCreateWithoutGoalInput, SessionUncheckedCreateWithoutGoalInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutGoalInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutGoalInput, SessionUncheckedUpdateWithoutGoalInput>
  }

  export type SessionUpdateManyWithWhereWithoutGoalInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutGoalInput>
  }

  export type SessionCreateWithoutTemplateInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    pickup?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    song?: SongCreateNestedOneWithoutSessionsInput
    tags?: TagCreateNestedManyWithoutSessionsInput
    recordings?: RecordingCreateNestedManyWithoutSessionInput
    instructor?: InstructorCreateNestedOneWithoutSessionsInput
    goal?: GoalCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutTemplateInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    songId?: string | null
    instructorId?: string | null
    goalId?: string | null
    pickup?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: TagUncheckedCreateNestedManyWithoutSessionsInput
    recordings?: RecordingUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutTemplateInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutTemplateInput, SessionUncheckedCreateWithoutTemplateInput>
  }

  export type SessionCreateManyTemplateInputEnvelope = {
    data: SessionCreateManyTemplateInput | SessionCreateManyTemplateInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutTemplateInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutTemplateInput, SessionUncheckedUpdateWithoutTemplateInput>
    create: XOR<SessionCreateWithoutTemplateInput, SessionUncheckedCreateWithoutTemplateInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutTemplateInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutTemplateInput, SessionUncheckedUpdateWithoutTemplateInput>
  }

  export type SessionUpdateManyWithWhereWithoutTemplateInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutTemplateInput>
  }

  export type SongCreateWithoutSessionsInput = {
    id?: string
    userId: string
    title: string
    key?: $Enums.Key | null
    capo?: number | null
    tuning?: $Enums.Tuning
    thumbStyle?: $Enums.ThumbStyle | null
    status?: $Enums.SongStatus
    currentBlocker?: string | null
    createdAt?: Date | string
    videos?: SongVideoCreateNestedManyWithoutSongInput
  }

  export type SongUncheckedCreateWithoutSessionsInput = {
    id?: string
    userId: string
    title: string
    key?: $Enums.Key | null
    capo?: number | null
    tuning?: $Enums.Tuning
    thumbStyle?: $Enums.ThumbStyle | null
    status?: $Enums.SongStatus
    currentBlocker?: string | null
    createdAt?: Date | string
    videos?: SongVideoUncheckedCreateNestedManyWithoutSongInput
  }

  export type SongCreateOrConnectWithoutSessionsInput = {
    where: SongWhereUniqueInput
    create: XOR<SongCreateWithoutSessionsInput, SongUncheckedCreateWithoutSessionsInput>
  }

  export type TagCreateWithoutSessionsInput = {
    id?: string
    userId: string
    name: string
  }

  export type TagUncheckedCreateWithoutSessionsInput = {
    id?: string
    userId: string
    name: string
  }

  export type TagCreateOrConnectWithoutSessionsInput = {
    where: TagWhereUniqueInput
    create: XOR<TagCreateWithoutSessionsInput, TagUncheckedCreateWithoutSessionsInput>
  }

  export type RecordingCreateWithoutSessionInput = {
    id?: string
    url: string
    label?: string | null
    createdAt?: Date | string
  }

  export type RecordingUncheckedCreateWithoutSessionInput = {
    id?: string
    url: string
    label?: string | null
    createdAt?: Date | string
  }

  export type RecordingCreateOrConnectWithoutSessionInput = {
    where: RecordingWhereUniqueInput
    create: XOR<RecordingCreateWithoutSessionInput, RecordingUncheckedCreateWithoutSessionInput>
  }

  export type RecordingCreateManySessionInputEnvelope = {
    data: RecordingCreateManySessionInput | RecordingCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type InstructorCreateWithoutSessionsInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
  }

  export type InstructorUncheckedCreateWithoutSessionsInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
  }

  export type InstructorCreateOrConnectWithoutSessionsInput = {
    where: InstructorWhereUniqueInput
    create: XOR<InstructorCreateWithoutSessionsInput, InstructorUncheckedCreateWithoutSessionsInput>
  }

  export type GoalCreateWithoutSessionsInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
  }

  export type GoalUncheckedCreateWithoutSessionsInput = {
    id?: string
    userId: string
    name: string
    createdAt?: Date | string
  }

  export type GoalCreateOrConnectWithoutSessionsInput = {
    where: GoalWhereUniqueInput
    create: XOR<GoalCreateWithoutSessionsInput, GoalUncheckedCreateWithoutSessionsInput>
  }

  export type SessionTemplateCreateWithoutSessionsInput = {
    id?: string
    userId: string
    name: string
    showMetronome?: boolean
    showSongPicker?: boolean
    showGoalPicker?: boolean
    checklistItems?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SessionTemplateUncheckedCreateWithoutSessionsInput = {
    id?: string
    userId: string
    name: string
    showMetronome?: boolean
    showSongPicker?: boolean
    showGoalPicker?: boolean
    checklistItems?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SessionTemplateCreateOrConnectWithoutSessionsInput = {
    where: SessionTemplateWhereUniqueInput
    create: XOR<SessionTemplateCreateWithoutSessionsInput, SessionTemplateUncheckedCreateWithoutSessionsInput>
  }

  export type SongUpsertWithoutSessionsInput = {
    update: XOR<SongUpdateWithoutSessionsInput, SongUncheckedUpdateWithoutSessionsInput>
    create: XOR<SongCreateWithoutSessionsInput, SongUncheckedCreateWithoutSessionsInput>
    where?: SongWhereInput
  }

  export type SongUpdateToOneWithWhereWithoutSessionsInput = {
    where?: SongWhereInput
    data: XOR<SongUpdateWithoutSessionsInput, SongUncheckedUpdateWithoutSessionsInput>
  }

  export type SongUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    key?: NullableEnumKeyFieldUpdateOperationsInput | $Enums.Key | null
    capo?: NullableIntFieldUpdateOperationsInput | number | null
    tuning?: EnumTuningFieldUpdateOperationsInput | $Enums.Tuning
    thumbStyle?: NullableEnumThumbStyleFieldUpdateOperationsInput | $Enums.ThumbStyle | null
    status?: EnumSongStatusFieldUpdateOperationsInput | $Enums.SongStatus
    currentBlocker?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videos?: SongVideoUpdateManyWithoutSongNestedInput
  }

  export type SongUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    key?: NullableEnumKeyFieldUpdateOperationsInput | $Enums.Key | null
    capo?: NullableIntFieldUpdateOperationsInput | number | null
    tuning?: EnumTuningFieldUpdateOperationsInput | $Enums.Tuning
    thumbStyle?: NullableEnumThumbStyleFieldUpdateOperationsInput | $Enums.ThumbStyle | null
    status?: EnumSongStatusFieldUpdateOperationsInput | $Enums.SongStatus
    currentBlocker?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videos?: SongVideoUncheckedUpdateManyWithoutSongNestedInput
  }

  export type TagUpsertWithWhereUniqueWithoutSessionsInput = {
    where: TagWhereUniqueInput
    update: XOR<TagUpdateWithoutSessionsInput, TagUncheckedUpdateWithoutSessionsInput>
    create: XOR<TagCreateWithoutSessionsInput, TagUncheckedCreateWithoutSessionsInput>
  }

  export type TagUpdateWithWhereUniqueWithoutSessionsInput = {
    where: TagWhereUniqueInput
    data: XOR<TagUpdateWithoutSessionsInput, TagUncheckedUpdateWithoutSessionsInput>
  }

  export type TagUpdateManyWithWhereWithoutSessionsInput = {
    where: TagScalarWhereInput
    data: XOR<TagUpdateManyMutationInput, TagUncheckedUpdateManyWithoutSessionsInput>
  }

  export type TagScalarWhereInput = {
    AND?: TagScalarWhereInput | TagScalarWhereInput[]
    OR?: TagScalarWhereInput[]
    NOT?: TagScalarWhereInput | TagScalarWhereInput[]
    id?: StringFilter<"Tag"> | string
    userId?: StringFilter<"Tag"> | string
    name?: StringFilter<"Tag"> | string
  }

  export type RecordingUpsertWithWhereUniqueWithoutSessionInput = {
    where: RecordingWhereUniqueInput
    update: XOR<RecordingUpdateWithoutSessionInput, RecordingUncheckedUpdateWithoutSessionInput>
    create: XOR<RecordingCreateWithoutSessionInput, RecordingUncheckedCreateWithoutSessionInput>
  }

  export type RecordingUpdateWithWhereUniqueWithoutSessionInput = {
    where: RecordingWhereUniqueInput
    data: XOR<RecordingUpdateWithoutSessionInput, RecordingUncheckedUpdateWithoutSessionInput>
  }

  export type RecordingUpdateManyWithWhereWithoutSessionInput = {
    where: RecordingScalarWhereInput
    data: XOR<RecordingUpdateManyMutationInput, RecordingUncheckedUpdateManyWithoutSessionInput>
  }

  export type RecordingScalarWhereInput = {
    AND?: RecordingScalarWhereInput | RecordingScalarWhereInput[]
    OR?: RecordingScalarWhereInput[]
    NOT?: RecordingScalarWhereInput | RecordingScalarWhereInput[]
    id?: StringFilter<"Recording"> | string
    sessionId?: StringFilter<"Recording"> | string
    url?: StringFilter<"Recording"> | string
    label?: StringNullableFilter<"Recording"> | string | null
    createdAt?: DateTimeFilter<"Recording"> | Date | string
  }

  export type InstructorUpsertWithoutSessionsInput = {
    update: XOR<InstructorUpdateWithoutSessionsInput, InstructorUncheckedUpdateWithoutSessionsInput>
    create: XOR<InstructorCreateWithoutSessionsInput, InstructorUncheckedCreateWithoutSessionsInput>
    where?: InstructorWhereInput
  }

  export type InstructorUpdateToOneWithWhereWithoutSessionsInput = {
    where?: InstructorWhereInput
    data: XOR<InstructorUpdateWithoutSessionsInput, InstructorUncheckedUpdateWithoutSessionsInput>
  }

  export type InstructorUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstructorUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalUpsertWithoutSessionsInput = {
    update: XOR<GoalUpdateWithoutSessionsInput, GoalUncheckedUpdateWithoutSessionsInput>
    create: XOR<GoalCreateWithoutSessionsInput, GoalUncheckedCreateWithoutSessionsInput>
    where?: GoalWhereInput
  }

  export type GoalUpdateToOneWithWhereWithoutSessionsInput = {
    where?: GoalWhereInput
    data: XOR<GoalUpdateWithoutSessionsInput, GoalUncheckedUpdateWithoutSessionsInput>
  }

  export type GoalUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GoalUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionTemplateUpsertWithoutSessionsInput = {
    update: XOR<SessionTemplateUpdateWithoutSessionsInput, SessionTemplateUncheckedUpdateWithoutSessionsInput>
    create: XOR<SessionTemplateCreateWithoutSessionsInput, SessionTemplateUncheckedCreateWithoutSessionsInput>
    where?: SessionTemplateWhereInput
  }

  export type SessionTemplateUpdateToOneWithWhereWithoutSessionsInput = {
    where?: SessionTemplateWhereInput
    data: XOR<SessionTemplateUpdateWithoutSessionsInput, SessionTemplateUncheckedUpdateWithoutSessionsInput>
  }

  export type SessionTemplateUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    showMetronome?: BoolFieldUpdateOperationsInput | boolean
    showSongPicker?: BoolFieldUpdateOperationsInput | boolean
    showGoalPicker?: BoolFieldUpdateOperationsInput | boolean
    checklistItems?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionTemplateUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    showMetronome?: BoolFieldUpdateOperationsInput | boolean
    showSongPicker?: BoolFieldUpdateOperationsInput | boolean
    showGoalPicker?: BoolFieldUpdateOperationsInput | boolean
    checklistItems?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManySongInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    instructorId?: string | null
    goalId?: string | null
    pickup?: string | null
    templateId?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SongVideoCreateManySongInput = {
    id?: string
    label: string
    url: string
    createdAt?: Date | string
  }

  export type SessionUpdateWithoutSongInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUpdateManyWithoutSessionsNestedInput
    recordings?: RecordingUpdateManyWithoutSessionNestedInput
    instructor?: InstructorUpdateOneWithoutSessionsNestedInput
    goal?: GoalUpdateOneWithoutSessionsNestedInput
    template?: SessionTemplateUpdateOneWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutSongInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    instructorId?: NullableStringFieldUpdateOperationsInput | string | null
    goalId?: NullableStringFieldUpdateOperationsInput | string | null
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutSessionsNestedInput
    recordings?: RecordingUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutSongInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    instructorId?: NullableStringFieldUpdateOperationsInput | string | null
    goalId?: NullableStringFieldUpdateOperationsInput | string | null
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SongVideoUpdateWithoutSongInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SongVideoUncheckedUpdateWithoutSongInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SongVideoUncheckedUpdateManyWithoutSongInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    song?: SongUpdateOneWithoutSessionsNestedInput
    recordings?: RecordingUpdateManyWithoutSessionNestedInput
    instructor?: InstructorUpdateOneWithoutSessionsNestedInput
    goal?: GoalUpdateOneWithoutSessionsNestedInput
    template?: SessionTemplateUpdateOneWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    songId?: NullableStringFieldUpdateOperationsInput | string | null
    instructorId?: NullableStringFieldUpdateOperationsInput | string | null
    goalId?: NullableStringFieldUpdateOperationsInput | string | null
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    recordings?: RecordingUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    songId?: NullableStringFieldUpdateOperationsInput | string | null
    instructorId?: NullableStringFieldUpdateOperationsInput | string | null
    goalId?: NullableStringFieldUpdateOperationsInput | string | null
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInstructorInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    songId?: string | null
    goalId?: string | null
    pickup?: string | null
    templateId?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateWithoutInstructorInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    song?: SongUpdateOneWithoutSessionsNestedInput
    tags?: TagUpdateManyWithoutSessionsNestedInput
    recordings?: RecordingUpdateManyWithoutSessionNestedInput
    goal?: GoalUpdateOneWithoutSessionsNestedInput
    template?: SessionTemplateUpdateOneWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutInstructorInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    songId?: NullableStringFieldUpdateOperationsInput | string | null
    goalId?: NullableStringFieldUpdateOperationsInput | string | null
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutSessionsNestedInput
    recordings?: RecordingUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutInstructorInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    songId?: NullableStringFieldUpdateOperationsInput | string | null
    goalId?: NullableStringFieldUpdateOperationsInput | string | null
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyGoalInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    songId?: string | null
    instructorId?: string | null
    pickup?: string | null
    templateId?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    song?: SongUpdateOneWithoutSessionsNestedInput
    tags?: TagUpdateManyWithoutSessionsNestedInput
    recordings?: RecordingUpdateManyWithoutSessionNestedInput
    instructor?: InstructorUpdateOneWithoutSessionsNestedInput
    template?: SessionTemplateUpdateOneWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    songId?: NullableStringFieldUpdateOperationsInput | string | null
    instructorId?: NullableStringFieldUpdateOperationsInput | string | null
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutSessionsNestedInput
    recordings?: RecordingUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutGoalInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    songId?: NullableStringFieldUpdateOperationsInput | string | null
    instructorId?: NullableStringFieldUpdateOperationsInput | string | null
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyTemplateInput = {
    id?: string
    userId: string
    date?: Date | string
    duration: number
    topic?: string | null
    notes?: string | null
    bpm?: number | null
    instrument?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    mood?: number | null
    focus?: number | null
    isFavorited?: boolean
    isPublic?: boolean
    songId?: string | null
    instructorId?: string | null
    goalId?: string | null
    pickup?: string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    song?: SongUpdateOneWithoutSessionsNestedInput
    tags?: TagUpdateManyWithoutSessionsNestedInput
    recordings?: RecordingUpdateManyWithoutSessionNestedInput
    instructor?: InstructorUpdateOneWithoutSessionsNestedInput
    goal?: GoalUpdateOneWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    songId?: NullableStringFieldUpdateOperationsInput | string | null
    instructorId?: NullableStringFieldUpdateOperationsInput | string | null
    goalId?: NullableStringFieldUpdateOperationsInput | string | null
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: TagUncheckedUpdateManyWithoutSessionsNestedInput
    recordings?: RecordingUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    topic?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    bpm?: NullableIntFieldUpdateOperationsInput | number | null
    instrument?: NullableStringFieldUpdateOperationsInput | string | null
    intention?: NullableStringFieldUpdateOperationsInput | string | null
    intentionMet?: NullableBoolFieldUpdateOperationsInput | boolean | null
    mood?: NullableIntFieldUpdateOperationsInput | number | null
    focus?: NullableIntFieldUpdateOperationsInput | number | null
    isFavorited?: BoolFieldUpdateOperationsInput | boolean
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    songId?: NullableStringFieldUpdateOperationsInput | string | null
    instructorId?: NullableStringFieldUpdateOperationsInput | string | null
    goalId?: NullableStringFieldUpdateOperationsInput | string | null
    pickup?: NullableStringFieldUpdateOperationsInput | string | null
    checklistAnswers?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordingCreateManySessionInput = {
    id?: string
    url: string
    label?: string | null
    createdAt?: Date | string
  }

  export type TagUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TagUncheckedUpdateManyWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type RecordingUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordingUncheckedUpdateWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RecordingUncheckedUpdateManyWithoutSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    label?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
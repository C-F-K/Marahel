declare class Map {
    static REPLACE_SAME: number;
    static REPLACE_BACK: number;
    width: number;
    height: number;
    private mapValues;
    private backValues;
    private numEntities;
    constructor(width: number, height: number);
    setValue(x: number, y: number, value: number): void;
    switchBuffers(): void;
    getValue(x: number, y: number): number;
    checkNumConstraints(): boolean;
    getNumEntity(e: string): any;
    getStringMap(): string[][];
    getIndexMap(): number[][];
    getColorMap(): number[][];
    toString(): string;
}
declare class Point {
    x: number;
    y: number;
    constructor(x?: number, y?: number);
    equal(p: Point): boolean;
    toString(): string;
}
declare class Entity {
    name: string;
    color: number;
    minValue: number;
    maxValue: number;
    constructor(name: string, parameters: any);
}
/**
 * main class for Marahel where user can a
 */
declare class Marahel {
    /**
     * defines the output maps as 2D matrix of strings
     */
    static STRING_OUTPUT: number;
    /**
     * defines the output maps as 2D matrix of colors
     */
    static COLOR_OUTPUT: number;
    /**
     * defines the output maps as 2D matrix of integers
     */
    static INDEX_OUTPUT: number;
    /**
     * maximum number of generation trials before considering a
     * failure generation
     */
    static GENERATION_MAX_TRIALS: number;
    /**
     * maximum number of combinations that A* will use before
     * considering finding the optimum
     */
    static CONNECTOR_TRIALS: number;
    /**
     * maximum number of trials for multiple A* restarts before
     * considering the current one is the best
     */
    static CONNECTOR_MULTI_TEST_TRIALS: number;
    /**
     * maximum number of trails done by the sampling divider algorithm
     * to resolve collision between regions
     */
    static SAMPLING_TRAILS: number;
    /**
     * don't change values by hand. it is an istance of the core system.
     * it could be used for advanced level generation.
     */
    static marahelEngine: Engine;
    /**
     * Get entity name from index value. Used if you are using INDEX_OUTPUT
     * @param index integer value corresponding to index in the map.
     * @return entity name corresponding to the index.
     *         returns "undefined" otherwise.
     */
    static getEntityName(index: number): string;
    /**
     * Initialize Marahel to a certain behavior.
     * Must be called before using Marahel to generate levels
     * @param data a JSON object that defines the behavior of Marahel
     *              check http://www.akhalifa.com/marahel/ for more details
     */
    static initialize(data: any): void;
    /**
     * Generate a new map using the specified generator
     * @param outputType (optional) the representation of the output.
     *                   default is Marahel.STRING_OUTPUT.
     *                   either Marahel.STRING_OUTPUT, Marahel.COLOR_OUTPUT,
     *                   Marahel.INDEX_OUTPUT
     * @param seed (optional) the seed for the random number generator
     * @return the generated map in form of 2D matrix
     */
    static generate(outputType?: number, seed?: number): any[][];
    /**
     * print the index generate map in the console in a 2D array format
     * @param generatedMap the map required to be printed
     */
    static printIndexMap(generatedMap: number[][]): void;
}
declare class Region {
    static BORDER_WRAP: number;
    static BORDER_NONE: number;
    border: number;
    private x;
    private y;
    private width;
    private height;
    constructor(x: number, y: number, width: number, height: number);
    setX(value: number): void;
    setY(value: number): void;
    setWidth(value: number): void;
    setHeight(value: number): void;
    getX(): number;
    getY(): number;
    getWidth(): number;
    getHeight(): number;
    setValue(x: number, y: number, value: number): void;
    getValue(x: number, y: number): number;
    getEntityNumber(value: number): number;
    getRegionPosition(x: number, y: number): Point;
    outRegion(x: number, y: number): boolean;
    getDistances(start: Point, neighbor: Neighborhood, value: number, checkSolid: Function): number[];
    intersect(pr: Region | Point): boolean;
}
declare class Neighborhood {
    width: number;
    height: number;
    name: string;
    locations: Point[];
    private printing;
    constructor(name: string, line: string);
    getTotal(value: number, center: Point, region: Region): number;
    setTotal(value: number, center: Point, region: Region): void;
    getPath(start: Point, end: Point, region: Region, checkSolid: Function): Point[];
    getNeighbors(x: number, y: number, region: Region): Point[];
    toString(): string;
}
declare class Prando {
    private static MIN;
    private static MAX;
    private _seed;
    private _value;
    /**
     * Generate a new Prando pseudo-random number generator.
     *
     * @param seed - A number or string seed that determines which pseudo-random number sequence will be created. Defaults to current time.
     */
    constructor();
    constructor(seed: number);
    constructor(seed: string);
    /**
     * Generates a pseudo-random number between a lower (inclusive) and a higher (exclusive) bounds.
     *
     * @param min - The minimum number that can be randomly generated.
     * @param pseudoMax - The maximum number that can be randomly generated (exclusive).
     * @return The generated pseudo-random number.
     */
    next(min?: number, pseudoMax?: number): number;
    /**
     * Generates a pseudo-random integer number in a range (inclusive).
     *
     * @param min - The minimum number that can be randomly generated.
     * @param max - The maximum number that can be randomly generated.
     * @return The generated pseudo-random number.
     */
    nextInt(min?: number, max?: number): number;
    /**
     * Generates a pseudo-random string sequence of a particular length from a specific character range.
     *
     * Note: keep in mind that creating a random string sequence does not guarantee uniqueness; there is always a
     * 1 in (char_length^string_length) chance of collision. For real unique string ids, always check for
     * pre-existing ids, or employ a robust GUID/UUID generator.
     *
     * @param length - Length of the strting to be generated.
     * @param chars - Characters that are used when creating the random string. Defaults to all alphanumeric chars (A-Z, a-z, 0-9).
     * @return The generated string sequence.
     */
    nextString(length?: number, chars?: string): string;
    /**
     * Generates a pseudo-random string of 1 character specific character range.
     *
     * @param chars - Characters that are used when creating the random string. Defaults to all alphanumeric chars (A-Z, a-z, 0-9).
     * @return The generated character.
     */
    nextChar(chars?: string): string;
    /**
     * Picks a pseudo-random item from an array. The array is left unmodified.
     *
     * Note: keep in mind that while the returned item will be random enough, picking one item from the array at a time
     * does not guarantee nor imply that a sequence of random non-repeating items will be picked. If you want to
     * *pick items in a random order* from an array, instead of *pick one random item from an array*, it's best to
     * apply a *shuffle* transformation to the array instead, then read it linearly.
     *
     * @param array - Array of any type containing one or more candidates for random picking.
     * @return An item from the array.
     */
    nextArrayItem<T>(array: T[]): T;
    /**
     * Generates a pseudo-random boolean.
     *
     * @return A value of true or false.
     */
    nextBoolean(): boolean;
    /**
     * Skips ahead in the sequence of numbers that are being generated. This is equivalent to
     * calling next() a specified number of times, but faster since it doesn't need to map the
     * new random numbers to a range and return it.
     *
     * @param iterations - The number of items to skip ahead.
     */
    skip(iterations?: number): void;
    /**
     * Reset the pseudo-random number sequence back to its starting seed. Further calls to next()
     * will then produce the same sequence of numbers it had produced before. This is equivalent to
     * creating a new Prando instance with the same seed as another Prando instance.
     *
     * Example:
     * let rng = new Prando(12345678);
     * console.log(rng.next()); // 0.6177754114889017
     * console.log(rng.next()); // 0.5784605181725837
     * rng.reset();
     * console.log(rng.next()); // 0.6177754114889017 again
     * console.log(rng.next()); // 0.5784605181725837 again
     */
    reset(): void;
    private recalculate();
    private map(val, minFrom, maxFrom, minTo, maxTo);
    private hashCode(str);
}
declare class Grad {
    private x;
    private y;
    private z;
    constructor(x: number, y: number, z: number);
    dot2(x: number, y: number): number;
    dot3(x: number, y: number, z: number): number;
}
declare class Noise {
    private grad3;
    private p;
    private perm;
    private gradP;
    private F2;
    private F3;
    private G2;
    private G3;
    constructor();
    seed(seed: number): void;
    simplex2(xin: number, yin: number): number;
    simplex3(xin: any, yin: any, zin: any): number;
    private fade(t);
    private lerp(a, b, t);
    perlin2(x: number, y: number): number;
    perlin3(x: number, y: number, z: number): number;
}
interface DividerInterface {
    getRegions(map: Region): Region[];
}
declare class SamplingDivider implements DividerInterface {
    private numberOfRegions;
    private minWidth;
    private minHeight;
    private maxWidth;
    private maxHeight;
    private allowIntersect;
    constructor(numberOfRegions: number, parameters: any);
    private checkIntersection(r, regions);
    private changeRegion(map, r);
    private getFitRegion(map, regions);
    private calculateIntersection(regions);
    private adjustRegions(map, regions);
    getRegions(map: Region): Region[];
}
declare class BinaryDivider implements DividerInterface {
    private numberOfRegions;
    private minWidth;
    private minHeight;
    private maxWidth;
    private maxHeight;
    constructor(numberOfRegions: number, parameters: any);
    private divideWidth(region, allowedWidth);
    private divideHeight(region, allowedHeight);
    private testDivide(region);
    private divide(region);
    private checkMaxSize(regions);
    private divideMaxSize(region);
    getRegions(map: Region): Region[];
}
declare class EqualDivider implements DividerInterface {
    private numberOfRegions;
    private minWidth;
    private minHeight;
    private maxWidth;
    private maxHeight;
    constructor(numberOfRegions: number, parameters: any);
    getRegions(map: Region): Region[];
}
interface OperatorInterface {
    check(leftValue: number, rightValue: number): boolean;
}
declare class LargerEqualOperator implements OperatorInterface {
    check(leftValue: number, rightValue: number): boolean;
}
declare class LessEqualOperator implements OperatorInterface {
    check(leftValue: number, rightValue: number): boolean;
}
declare class LargerOperator implements OperatorInterface {
    check(leftValue: number, rightValue: number): boolean;
}
declare class LessOperator implements OperatorInterface {
    check(leftValue: number, rightValue: number): boolean;
}
declare class EqualOperator implements OperatorInterface {
    check(leftValue: number, rightValue: number): boolean;
}
declare class NotEqualOperator implements OperatorInterface {
    check(leftValue: number, rightValue: number): boolean;
}
interface EstimatorInterface {
    calculate(iteration: number, position: Point, region: Region): number;
}
declare class NeighborhoodEstimator implements EstimatorInterface {
    private neighbor;
    private entities;
    constructor(line: string);
    calculate(iteration: number, position: Point, region: Region): number;
}
declare class NumberEstimator implements EstimatorInterface {
    private name;
    constructor(line: string);
    calculate(iteration: number, position: Point, region: Region): number;
}
declare class DistanceEstimator implements EstimatorInterface {
    private type;
    private neighbor;
    private entities;
    private allowed;
    constructor(line: string);
    private getMax(position, region, entityIndex);
    private getMin(position, region, entityIndex);
    calculate(iteration: number, position: Point, region: Region): number;
}
declare class Condition {
    private leftSide;
    private operator;
    private rightSide;
    private nextCondition;
    constructor(line: string);
    check(iteration: number, position: Point, region: Region): boolean;
}
declare class Executer {
    private neightbor;
    private entities;
    private nextExecuter;
    constructor(line: string);
    apply(position: Point, region: Region): void;
}
declare class Rule {
    private condition;
    private executer;
    private nextRule;
    constructor(lines: string[]);
    checkRule(iteration: number, position: Point, region: Region): boolean;
    execute(iteration: number, position: Point, region: Region): boolean;
}
declare abstract class Generator {
    protected regionsName: string;
    protected regions: Region[];
    protected rules: Rule[];
    protected minBorder: number;
    protected maxBorder: number;
    protected replacingType: number;
    protected borderType: number;
    constructor(currentRegion: any, rules: string[]);
    selectRegions(map: Region, regions: Region[]): void;
    applyGeneration(): void;
}
declare class AutomataGenerator extends Generator {
    private numIterations;
    private start;
    private explore;
    constructor(currentRegion: any, rules: string[], parameters: any);
    applyGeneration(): void;
}
declare class Agent {
    private position;
    private currentLifespan;
    private lifespan;
    private currentSpeed;
    private speed;
    private currentChange;
    private change;
    private currentDirection;
    private directions;
    private entities;
    constructor(lifespan: number, speed: number, change: Point, entities: Entity[], directions: Neighborhood);
    moveToLocation(region: Region): void;
    private checkAllowed(x, y, region, allow);
    private changeDirection(region, avoid);
    update(region: Region, rules: Rule[], allow: Entity[]): boolean;
}
declare class AgentGenerator extends Generator {
    private allowedEntities;
    private numAgents;
    private speed;
    private changeTime;
    private lifespan;
    private directions;
    constructor(currentRegion: any, rules: string[], parameters: any);
    applyGeneration(): void;
}
declare class Group {
    index: number;
    points: Point[];
    constructor();
    addPoint(x: number, y: number): void;
    getCenter(): Point;
    sort(p: Point): void;
    cleanPoints(region: Region, allowed: Entity[], neighbor: Neighborhood): void;
    combine(group: Group): void;
    distance(group: Group): number;
}
declare class ConnectorGenerator extends Generator {
    static MAX_ITERATIONS: number;
    static SHORT_CONNECTION: number;
    static RANDOM_CONNECTION: number;
    static HUB_CONNECTION: number;
    static FULL_CONNECTION: number;
    private neighbor;
    private entities;
    private connectionType;
    constructor(currentRegion: any, rules: string[], parameters: any);
    private floodFill(x, y, label, labelBoard, region);
    private getUnconnectedGroups(region);
    private connect(start, end, region);
    private connectRandom(groups, region);
    private shortestGroup(groups, region);
    private centerGroup(groups, region);
    private connectShort(groups, region);
    private connectFull(groups, region);
    private connectHub(groups, region);
    applyGeneration(): void;
}
declare class LocationNode {
    x: number;
    y: number;
    parent: LocationNode;
    constructor(parent?: LocationNode, x?: number, y?: number);
    checkEnd(x: number, y: number): boolean;
    estimate(x: number, y: number): number;
    toString(): string;
}
declare class AStar {
    private static convertNodeToPath(node);
    static getPath(start: Point, end: Point, directions: Point[], region: Region, checkSolid: Function): Point[];
    static getPathMultipleStartEnd(start: Point[], end: Point[], directions: Point[], region: Region, checkSolid: Function): Point[];
}
declare class EntityListParser {
    static parseList(line: string): Entity[];
}
declare class Random {
    private static rnd;
    private static noise;
    static initialize(): void;
    static changeSeed(seed: number): void;
    static getRandom(): number;
    static getIntRandom(min: number, max: number): number;
    static getNoise(x: number, y: number): number;
    static shuffleArray(array: any[]): void;
}
declare class Factory {
    static getEstimator(line: string): EstimatorInterface;
    static getOperator(line: string): OperatorInterface;
    static getDivider(type: string, numRegions: number, parameters: any): DividerInterface;
    static getGenerator(type: string, currentRegion: any, parameters: any, rules: string[]): Generator;
}
declare class Engine {
    /**
     *
     */
    replacingType: number;
    /**
     * the last generated map, equal to null if generate is not called
     */
    currentMap: Map;
    borderType: number;
    private minDim;
    private maxDim;
    private entities;
    private entityIndex;
    private neighbors;
    private regionDivider;
    private generators;
    constructor(data: any);
    private generateOneTime();
    generate(outputType?: number, seed?: number): any[][];
    getEntity(value: number | string): Entity;
    getAllEntities(): Entity[];
    getEntityIndex(name: string): number;
    getNeighborhood(name: string): Neighborhood;
}

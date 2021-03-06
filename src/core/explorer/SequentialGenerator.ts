/// <reference path="Generator.ts"/>

/**
 * Automata Generator class
 */
class SequentialGenerator extends Generator{
    /**
     * number of iterations to apply cellular automata
     */
    private numIterations:number;
    /**
     * anchor point to start the generation
     */
    private start:Point;
    /**
     * neighborhood defines which tiles to explore next
     */
    private explore:Neighborhood;

    /**
     * Constructor for the agent generator
     * @param currentRegion java object contain information about the applied region(s)
     * @param rules list of rules entered by the user
     * @param parameters for the automata generator
     */
    constructor(currentRegion:any, rules:string[], parameters:any){
        super(currentRegion, rules);

        this.numIterations = 0;
        if(parameters["iterations"]){
            this.numIterations = parseInt(parameters["iterations"]);
        }
        this.start = new Point();
        if(parameters["start"]){
            let parts = parameters["start"].split(",");
            this.start.x = Math.max(0, Math.min(1, parseFloat(parts[0])));
            this.start.y = this.start.x;
            if(parts.length > 1){
                this.start.y = Math.max(0, Math.min(1, parseFloat(parts[1])));
            }
        }
        this.explore = Marahel.marahelEngine.getNeighborhood("sequential");
        if(parameters["exploration"]){
            this.explore = Marahel.marahelEngine.getNeighborhood(parameters["exploration"]);
        }
    }

    /**
     * Apply the automata algorithm on the regions array
     */
    applyGeneration(): void {
        super.applyGeneration();
        for(let r of this.regions){
            for(let i:number=0; i<this.numIterations; i++){
                let visited:any = {};
                let exploreList:Point[] = [new Point(this.start.x * r.getWidth(), this.start.y * r.getHeight())];
                while(exploreList.length > 0){
                    let currentPoint:Point = exploreList.splice(0, 1)[0];
                    currentPoint = r.getRegionPosition(currentPoint.x, currentPoint.y);
                    if(!visited[currentPoint.toString()] && !r.outRegion(currentPoint.x, currentPoint.y)){
                        visited[currentPoint.toString()] = true;
                        this.rules.execute(i/this.numIterations, currentPoint, r);
                        let neighbors:Point[] = this.explore.getNeighbors(currentPoint.x, currentPoint.y, r);
                        for(let n of neighbors){
                                exploreList.push(n);
                        }
                    }
                }
                Marahel.marahelEngine.currentMap.switchBuffers();
            }
        }
    }
}
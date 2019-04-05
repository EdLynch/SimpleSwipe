var swipeListener = function(target,rightFunc,leftFunc,sensitivity) {

    //Will run the passes functions if a swipe is detected
    this.swipeTest = function (){
        //Esure pointer coords are integers
        let beforeX = parseInt(this.initialX);
        let afterX = parseInt(this.afterX);
    
        //Throw errors if they can not be converted
        if(isNaN(beforeX) || isNaN(afterX) ){
            throw ("Mouse location could not be parsed to number.");
        }else{   
            //Get the difference     
            let difference = Math.abs(beforeX-afterX);
            //If the difference is more than the specified sensitivity
            if(difference>this.sensitivity){
                //Left Swipe detected
                if(beforeX<afterX){
                    this.leftFunc();
                //right Swipe detected
                }else{
                    this.rightFunc();
                }
            }
        }
    }
	
	//Handle Mouse Events, bind this binding as it will be used in event listeners
	//Handle mouse down
	this.mouseDown = function(e){
		//Set initial
		this.initialX = e.clientX;		
	}.bind(this);
	//Handle mouse up
	this.mouseUp = function(e){
		//Set after
		this.afterX = e.clientX;
		//Call swipe test function
		this.swipeTest();		
	}.bind(this);
	
	//Handle Touch Events, bind this binding as it will be used in event listeners
	//Handle touch down
	this.touchDown = function(e){
		//Set initial
		this.initialX = e.changedTouches[0].pageX;
	}.bind(this);
	//Handle touch up
	this.touchUp = function(e){
        //Set after
        this.afterX = e.changedTouches[0].pageX;
        //Call swipe test function
        this.swipeTest();
	}.bind(this);

    //Set the swipe object up
    this.initialise=function(target,leftFunc,rightFunc,sensitivity){

        //Default to global listener
        this.target = target || document;

        //Assign left function, default to a consolse log
        this.leftFunc = leftFunc || function(){console.log("Left Swipe")};
        //Assign right function, default to a consolse log
        this.rightFunc = rightFunc || function(){console.log("Right Swipe")};
        //Assign sensitivity, defalut to 50
        this.sensitivity = sensitivity || 50;

        //Set initialX to 0
        this.initialX=0;

        //Set afterX to 0
        this.afterX=0;
		
		
        //Deal with mouse events
        this.target.addEventListener("mousedown",this.mouseDown,false);

        this.target.addEventListener("mouseup",this.mouseUp,false);


        //Deal with pointer events for touch screens
        this.target.addEventListener("touchstart", this.touchDown, false);

        this.target.addEventListener("touchend", this.touchUp, false);
    };
	
	//Remove Event Listeners
	this.destroy=function(){
		
		
        //Deal with mouse events
        this.target.removeEventListener("mousedown",this.mouseDown,false);

        this.target.removeEventListener("mouseup",this.mouseUp,false);


        //Deal with pointer events for touch screens
        this.target.removeEventListener("touchstart", this.touchDown, false);

        this.target.removeEventListener("touchend", this.touchUp, false);
		
	};

    //For them over state side.
    this.initialize=this.initialise;
	
    //Initialise/Constructor call
    this.initialise(target,leftFunc,rightFunc,sensitivity);
};

//export default swipeListener;
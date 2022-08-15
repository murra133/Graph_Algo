class HashMap{
    constructor(ic,lf,gf,hq,ch){
        this.c = ic; //HashMap Capacity
        this.lf = lf; //Load Factor
        this.cl = 0; //Current Load
        this.gf = gf; //Growth Factor
        this.hq = hq; //Hash Quantities
        this.ch = ch; //Collision Handling
        this.hash_needed = 0;
        this.map = new Array(this.c);
        this.div = document.createElement("div");
        this.div.id = "HashMap"
        this.rehash_val = [];
        did("view_port").appendChild(this.div);
        let rg = Math.min((150/this.c),15)
        this.div.setAttribute("style","row-gap:"+rg+"px")
        this.animate = [];

        if(this.ch=="ll"){
            for(let i = 0;i<this.c;i++){
                this.map[i] = new LinkedList(i,this.c);
            }
        }

    }

    getAnimate(){
        return this.animate;
    }
    clearAnimate(){
        this.animate=[];
    }
    addAnimate(action){
        this.animate.push(action);
    }
    getHashNeeded(){
        return this.hash_needed;
    }
    setHashNeeded(val){
        this.hash_needed = val
    }
    setParam(ic,lf,gf,hq,ch){
        this.c = ic; //HashMap Capacity
        this.lf = lf; //Load Factor
        this.gf = gf; //Growth Factor
        this.hq = hq; //Hash Quantities
        this.ch = ch; //Collision Handling
    }
    getAllValues(){
        let values = [];
        for(let i in this.map){
            let val = this.map[i].getAllValues();
            for(let k in val){
                values.push(val[k])
            }
        }
        return values;
    }
    getint(string){
        let val;
        if(isNaN(parseFloat(string))){
            val = string.charCodeAt(0)
        }
        else{
            val = parseFloat(string)
        }
        return val;
    }
    hash_hash(input,func_val){
        if(func_val==0){
            return this.getint(input)%this.c
        }
        else{
            return (this.getint(input)+2)%this.c
        }
    }
    hash_insert(input,func_val){
       this.animate.push("log_Hashing Value = "+input);
       let key =  this.hash_hash(input,0);
       this.animate.push("log_HashKey = "+key);
       if(this.ch=="ll"){
        console.log(input)
        if(!this.map[key].insertNode(input)){
            this.animate.push("log_Value Already in Hash Map");
            return;
        }
       }
       else{
        let node = this.map[key].getHead();
        if(node!=null){
            this.animate.push("a_"+node.getDiv().id+"_Space "+key+" is filled");
            if(this.hq=="2"){
                this.animate.push("Rehashing ...");
                key = this.hash_hash(input,1);
                node = this.map[key].getHead();
            }
            while(node!=null){
                this.animate.push("a_"+node.getDiv().id+"_Space "+key+" is filled");
                key++;
                if(key>=this.map.length){
                    key=0;
                }
                node = this.map[key].getHead();
                this.animate.push("log_Checking Adjacent Space");
            }
        }
        this.animate.push("log_Space Found");
        this.map[key].insertNode(input);
        console.log("Runnings")
       }
       this.animate.push("log_Calculating Current Load");
       this.cl++;
       this.animate.push("log_Current Load = "+this.cl);
       this.animate.push("set_param-cl_"+this.cl);
       this.animate.push("log_Current Load Factor = "+(this.cl/this.c));
       this.animate.push("set_param-clf_"+(this.cl/this.c));

       if((this.cl/this.c)>this.lf){
        this.animate.push("log_Current Load Factor > Load Factor");
        this.rehash()
       }
       this.animate.push("log_Current Load Factor < Load Factor");
    }
    getCapacity(){
        return this.c;
    }
    deleteLists(){
        removeAllChildNodes(this.div);
        removeAllChildNodes(did("hm-svg"));
    }
    rehash(){
        this.animate.push("log_Rehashing . . .");
        this.rehash_val = this.getAllValues();
        this.animate.push("log_Values to be rehashed: "+this.rehash_val.join(","));

        if((this.cl/this.c)>this.lf){
            this.c = Math.floor(this.c*this.gf);
            this.animate.push("log_Capacity = "+this.c);
            this.animate.push("set_param-c_"+this.c);
        }
        this.cl = 0;
        this.animate.push("log_Current Load = "+this.cl);
        this.animate.push("set_param-cl_"+this.cl);
        this.animate.push("log_Current Load Factor = 0");
        this.animate.push("set_param-clf_0");
        this.animate.push("delete_all")
        this.animate.push("crehash_11")
    }
    continue_rehash(){
        console.log("running")
        let values = this.rehash_val;
        this.map = new Array(this.c);
        for(let i = 0;i<this.c;i++){
            this.map[i] = new LinkedList(i,this.c);
        }
        for(let i in values){
            console.log("running")
            this.hash_insert(values[i],0)
        }
        this.hash_needed=false;
        this.rehash_val = [];
    }
    updateSvg(){
        for(let i in this.map){
            this.map[i].updateSvg();
        }
    }

    find_hm(value){
        if(this.ch=="ll"){
            this.animate.push("log_Hashing "+ value+" ...");
            let key = this.hash_hash(value,0);
            this.animate.push("log_HashKey = "+key);
            this.map[key].find_ll(value);
        }
    }
    delete_hm(value){
        if(this.ch=="ll"){
            this.animate.push("log_Hashing "+ value+" ...");
            let key = this.hash_hash(value,0);
            this.animate.push("log_HashKey = "+key);
            this.map[key].delete_ll(value);
        }
    }
}


class LinkedList{
    constructor(val,c){
        this.head = null;
        this.val = val;
        this.div = document.createElement("div");
        this.div.setAttribute("class","hm-linked_list");
        this.headdiv = document.createElement("div");
        this.headdiv.className = "hm-head";
        this.div.appendChild(this.headdiv);
        this.div.id = val;
        this.headdiv.innerHTML = val;
        did("HashMap").appendChild(this.div);
        this.h = Math.min(screen.height/c - 300/c,70);
        let w = this.h*2;
        this.headdiv.setAttribute("style","height:"+this.h+"px;width:"+w+"px");
        this.headdiv.id = val+"-0";
        this.svg = document.createElementNS('http://www.w3.org/2000/svg',"path");
        this.svg.setAttribute("stroke","black")
        this.svg.setAttribute("stroke-width","2px");
        this.svg.setAttribute("fill","transparent") 
        this.svg.classList.add("hidden");
        this.svg.id = "svg"+val+"-0"
        did("hm-svg").appendChild(this.svg);
    }
    getHead(){
        return this.head;
    }
    insertNode(value){
        let currNode=this.head;
        map.addAnimate("a_"+this.headdiv.id+"_Inserting Into Hash Key: "+this.val+" position: 0");
        map.addAnimate("da_"+this.headdiv.id)
        if(currNode!=null){
            map.addAnimate("a_"+currNode.getDiv().id+"_Inserting Into Hash Key: "+this.val+" position: "+currNode.getLoc());
            if(currNode.val==value){
                return false;
            }
            map.addAnimate("da_"+currNode.getDiv().id);
        }
        while (currNode!=null&&currNode.getFront()!=null){
            currNode = currNode.getFront();
            map.addAnimate("a_"+currNode.getDiv().id+"_Inserting Into Hash Key: "+this.val+" position: "+currNode.getLoc());
            map.addAnimate("da_"+currNode.getDiv().id);
        }
        let newNode = new listNodes(value,currNode,this.h,this.val);
        this.div.appendChild(newNode.getDiv());
        if(this.head==null){
            this.head = newNode;
            let top2 = newNode.getDiv().getBoundingClientRect().top+this.h/2;
            let left2 = newNode.getDiv().getBoundingClientRect().left+10;
            let top1 = this.headdiv.getBoundingClientRect().top+this.h/2;
            let left1 = this.headdiv.getBoundingClientRect().left+this.h*2-10;
            let pos = "M"+left1+" "+top1+" L"+left2+" "+top2;
            this.svg.setAttribute("d",pos);
        }
        else{
            currNode.setFront(newNode);
        }
        map.addAnimate("disp_"+newNode.getDiv().id);
        map.addAnimate("usvg_1");
        if(this.head==newNode){
            map.addAnimate("disp_"+this.svg.id);
        }
        else{
            map.addAnimate("disp_svg"+currNode.getDiv().id);
        }
        return true;

    }
    updateSvg(){
        if(this.head==null){
            return
        }
        let top2 = this.head.getDiv().getBoundingClientRect().top+this.h/2;
        let left2 = this.head.getDiv().getBoundingClientRect().left+10;
        let top1 = this.headdiv.getBoundingClientRect().top+this.h/2;
        let left1 = this.headdiv.getBoundingClientRect().left+this.h*2-10;
        let pos = "M"+left1+" "+top1+" L"+left2+" "+top2;
        this.svg.setAttribute("d",pos);
        let currNode = this.head;
        while (currNode.getFront()!=null){
            let nextNode = currNode.getFront(); 
            currNode.setFront(nextNode);
            currNode = nextNode;
        }
        
    }
    getAllValues(){
        let values = [];
        let currNode=this.head;
        if(this.head==null){
            return values
        }
        values.push(currNode.getVal());
        map.addAnimate("a_"+currNode.getDiv().id+"_Getting Value: "+currNode.getVal());
        map.addAnimate("da_"+currNode.getDiv().id);

        while(currNode.getFront()!=null){
            currNode = currNode.getFront();
            values.push(currNode.getVal());
            map.addAnimate("a_"+currNode.getDiv().id+"_Getting Value: "+currNode.getVal());
            map.addAnimate("da_"+currNode.getDiv().id);
        }
        return values;
    }
    find_ll(value){
        let currNode = this.head;
        while(currNode!=null){
            map.addAnimate("a_"+currNode.getDiv().id+"_Is "+value+" equal to "+currNode.getVal());
            if(currNode.val==value){
                map.addAnimate("log_Value Found");
                return true
            }
            map.addAnimate("da_"+currNode.getDiv().id+"_Values are Not Equal");
            currNode=currNode.getFront();
        }
        map.addAnimate("log_Value Not in Map");
        return false;
    }
    delete_ll(value){
        let currNode = this.head;
        map.addAnimate("a_"+currNode.getDiv().id+"_Checking if"+currNode.getVal()+" Equals to "+value)
        if(currNode.val==value){
            map.addAnimate("log_Values equal Deleting Value from Map...");
            if(currNode.getFront()!=null){
                this.head = currNode.getFront();
                map.addAnimate("usvg_0_0");
                map.addAnimate("del_"+currNode.getDiv().id+"_Node Deleted");
                map.addAnimate("usvg_0_0");
            }
            else{
                this.head=null;
                map.addAnimate("del_"+currNode.getDiv().id+"_Node Deleted");
                this.svg.classList.add("hidden");

            }
            return;
        }
        while(currNode.getFront()!=null){
            map.addAnimate("a_"+currNode.getFront().getDiv().id+"_Checking if"+currNode.getFront().getVal()+" Equals to "+value)
            if(currNode.getFront().val == value){
                map.addAnimate("log_Values equal Deleting Value from Map...");
                let del_node = currNode.getFront();
                let temp = del_node.getFront();
                currNode.setFront(temp);
                map.addAnimate("usvg_0_0");
                map.addAnimate("del_"+del_node.getDiv().id+"_Node Deleted");
                map.addAnimate("usvg_0_0");
                return;

            }
            currNode = currNode.getFront();
            map.addAnimate("da_"+currNode.getDiv().id+"_Values do not equal, checking next node");
        }
        map.addAnimate("log_Value has not been found in Map");
    }
}
class listNodes{
    constructor(val, back,h,hashval){
        this.hashval = hashval;
        if(back==null){
            this.loc = 1;
        }
        else{
            this.loc = back.getLoc()+1;
        }
        this.val = val;
        this.h = h;
        this.front = null;
        this.back = back;
        this.div = document.createElement("div"); 
        let w = h*2;
        this.div.setAttribute("style","height:"+h+"px;width:"+w+"px");
        this.div.className = "hm-node";
        this.div.innerHTML = val
        this.div.id = this.hashval+"-"+this.loc;
        this.div.classList.add("hidden");
        this.svg = document.createElementNS('http://www.w3.org/2000/svg',"path");
        this.svg.setAttribute("stroke","black")
        this.svg.setAttribute("stroke-width","2px");
        this.svg.setAttribute("fill","transparent")
        this.svg.classList.add("hidden");
        this.svg.id = "svg"+this.hashval+"-"+this.loc;
        did("hm-svg").appendChild(this.svg);

    }
    getLoc(){
        return this.loc;
    }
    getFront(){
        return this.front;
    }
    getHashval(){
        return this.hashval;
    }
    setFront(node){
        if(node==null){
            this.svg.classList.add("hidden");
            return;
        }
        let top2 = node.getDiv().getBoundingClientRect().top+this.h/2;
        let left2 = node.getDiv().getBoundingClientRect().left+10;
        let top1 = this.getDiv().getBoundingClientRect().top+this.h/2;
        let left1 = this.getDiv().getBoundingClientRect().left+this.h*2-10;
        this.front = node;
        let pos = "M"+left1+" "+top1+" L"+left2+" "+top2;
        this.svg.setAttribute("d",pos);
        
    }
    getDiv(){
        return this.div;
    }
    getVal(){
        return this.val;
    }
    deleteNode(){
        this
    }

}


$(document).ready(function(){
    let ic = did("hm-ic").value;
    let lf = did("hm-lf").value;
    let gf = did("hm-gf").value;
    let hq = did("hm-quantities").value;
    let ch = did("hm-handle").value;
    speed = 100;
    map = new HashMap(ic,lf,gf,hq,ch)
    map.clearAnimate();
});


function reset_log(){
    removeAllChildNodes(did("action_log"));

}

function choose_hash_function(tag){
        let tags = qsa(".hs-tag");
        tags.forEach(tag_=>{
            tag_.className = "hs-tag";
        })
        tag.className="hs-tag active"
}

function func_options(){
    if(map.getHashNeeded()){
        did("algo").value="rv"
        did("hm-iv").setAttribute("style","display:none")
        did("hm-fv").setAttribute("style","display:none")
        did("hm-dv").setAttribute("style","display:none")
        select_algo(did("algo"))

    }
    else{
        did("hm-iv").removeAttribute("style")
        did("hm-fv").removeAttribute("style")
        did("hm-dv").removeAttribute("style")
        did("algo").value="iv"
        select_algo(did("algo"))

    }
}

function select_algo(tag){
    did("run-button").setAttribute("onclick","run_algo('"+tag.value+"')");
}

function run_algo(algo){
    toggle_sidebar(did("settings2"))
    reset_hm();
    let value = did("input_value").value;
    if(algo=="iv"){
        map.hash_insert(value);
    }
    if(algo=="rv"){
        map.rehash();
    }
    if(algo=="fv"){
        map.find_hm(value);
    }
    if(algo=="dv"){
        map.delete_hm(value);
    }
    animate(0);
    map.setHashNeeded(false);
    func_options();
}

function hash_param(){
    let ic = did("hm-ic").value;
    let lf = did("hm-lf").value;
    let gf = did("hm-gf").value;
    let hq = did("hm-quantities").value;
    let ch = did("hm-handle").value;
    map.setParam(ic,lf,gf,hq,ch);
    map.setHashNeeded(true);
    func_options();
}
function reset_hm(){
    let ac = qsa(".hm-active");
    ac.forEach(node=>{
        node.classList.remove("hm-active");
    })
    reset_log();
}
function animate(loc){
    if(map.getAnimate().length==0||loc>=map.getAnimate().length){
        map.clearAnimate();
        log_text("Complete");
        return
    }
    /*
    * log_text = logs text value into action log
    * a_id = makes a node active.
    * da_id = deactivate item with referenced id.
    * dv_id = devisit item with referenced id.
    * v_id = visits item with reference id.
    */
    let activities = map.getAnimate()[loc].split("_");
    console.log(activities);
    let action = activities[0];
    let id = activities[1]
    let text = activities[2];
    switch (action){
        case "del":
            did(id).remove();
            did("svg"+id).remove();
            break;
        case "log":
            log_text(id);
            break;
        case "a":
            did(id).classList.add("hm-active");
            log_text(text);
            break;
        case "da":
            did(id).classList.remove("hm-active");
            break;
        case "v":
            did(id).classList.add("hm-visit");
            break;
        case "dv":
            did(id).classList.remove("hm-visit");
            break;
        case "disp":
            did(id).classList.remove("hidden");
            break;
        case "usvg":
            map.updateSvg();
            break;
        case "set":
            did(id).innerHTML = text;
            break;
        case "clear":
            map.clearAnimate();
            break;
        case "delete":
            if(id=="all"){
                map.deleteLists();
            }
            break;
        case "crehash":
            map.continue_rehash();
            break;
    }
    setTimeout(function(){
        animate(loc+1);
    },speed);
}

function log_text(text){
    let count = did("action_log").childElementCount+1;
    count = Math.floor(count-count/2)

    let p = document.createElement("p");
    p.innerHTML = count+". "+text;
    let br = document.createElement("br");
    did("action_log").appendChild(p);
    did("action_log").appendChild(br);
    did("action_log").scrollTo(0,did("action_log").scrollHeight);

}


function update_SVG(){
    map.updateSvg();
}
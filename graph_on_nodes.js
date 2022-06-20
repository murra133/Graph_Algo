
class heap_{

    constructor(start_heap){
        this.heap = start_heap;
    }
    get_parent(location){
        return Math.floor(location/2)
    }
    get_right_child(location){
        ///Location of node as int///
        return location*2+1;
    }
    get_left_child(location){
        ///Location of node as int///
        return location*2;
    }
    child_defined(side,loc){
        //l = left, r= right;
        if(side=="l"){
            if(this.heap[this.get_left_child(loc)]==null||this.heap[this.get_left_child(loc)]==undefined){
                return false;
            }
        }
        else{
            if(this.heap[this.get_right_child(loc)]==null||this.heap[this.get_right_child(loc)]==undefined){
                return false;
            }
        }
        return true;
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
    hp_insert(val){
        let loc = 0;
        for(let i=1;i<this.heap.length;i++){
            if(this.heap[i]==null){
                this.heap[i] = val;
                loc = i;
                break
            }
        }
        this.heapify_up(loc);
    }

    hp_remove(){
        let loc =0;
        for(let i=1;i<this.heap.length;i++){
            if(this.heap[i]==null){
                loc=i-1;
                break;
            }
        }
        let min = this.heap[1]
        this.heap[1] = this.heap[loc];
        this.heap[loc] = null;
        this.heapify_down(1);
        return min;
    }
    heapify_up(curr){
        let parent = this.get_parent(curr)
        console.log(this.heap)
        while(this.getint(this.heap[parent])>this.getint(this.heap[curr])){
            console.log(this.heap[curr])
            let temp = this.heap[curr];
            this.heap[curr] = this.heap[parent];
            this.heap[parent]=temp;
            curr = parent;
            parent = this.get_parent(curr)
            if(parent<1){
                break;
            }
            console.log(this.heap[parent])
        }
    
    }
    heapify_down(curr){
        if(!this.child_defined("l",curr)&&!this.child_defined("r",curr)){
            return;
        }
        let left;
        let right;
        let temp;
      
        while(this.child_defined("l",curr)&&this.child_defined("r",curr)){
            left = this.get_left_child(curr);
            right = this.get_right_child(curr); 
            if(this.getint(this.heap[left])>this.getint(this.heap[curr])&&this.getint(this.heap[right])>this.getint(this.heap[curr])){
                break;
            }
            if(this.getint(this.heap[left])<this.getint(this.heap[right])){
                if(this.getint(this.heap[curr])>this.getint(this.heap[left])){
                    temp = this.heap[curr];
                    this.heap[curr] = this.heap[left];
                    this.heap[left] = temp;
                    curr=left;
                }
            }
            else{
                if(this.getint(this.heap[curr])>this.getint(this.heap[right])){
                    temp = this.heap[curr];
                    this.heap[curr] = this.heap[right];
                    this.heap[right] = temp;
                    curr=right;
                }
            }
        }
    
    }

}

class graph{
    constructor(){
        this.start=null;
        this.end=null;
        this.animation = [];
        this.grid=[];
        this.div = did("node_grid")
        this.val = new heap_([-1, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'L', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', null, null, null, null, null])
    }

    addNode(node1){
        this.grid.push(node1.duplicateNode());
        this.grid[this.grid.length-1].setIndex(this.grid.length-1);
        this.div.appendChild(this.grid[this.grid.length-1].getDiv())
    }

    getStart(){
        return this.start;
    }
    setStart(node){
        if(g.start!=null){
            g.start.getDiv().classList.remove("gn-start");
        }
        if(g.start==node){
            g.start=null;
        }
        else{
            g.start=node;
            g.start.getDiv().classList.add("gn-start")
        }
    }
    getEnd(){
        return this.end;
    }
    setEnd(node){
        if(g.end!=null){
            g.end.getDiv().classList.remove("gn-end");
        }
        if(g.end==node){
            g.end=null;
        }
        else{
            g.end=node;
            g.end.getDiv().classList.add("gn-end")
        }
    }
    getAnimation(){
        return this.animation;
    }
    clearAnimation(){
        g.animation = [];
    }
    getNewId(){
        return this.grid.length
    }
    getAllNodes(){
        return this.grid;
    }
    getNode(index){
        return this.grid[index];
    }
    getNewVal(){
        return this.val.hp_remove();
    }
    insertVal(value){
        this.val.hp_insert(value)
    }
    removeNode(index){
        let new_grid = [];
        let i =0;
        while(0<this.grid.length){
            if(i<index){
                new_grid.push(this.grid.shift());
                new_grid[i].setIndex(i);
            }
            else if(i>index){
                new_grid.push(this.grid.shift());
                new_grid[i-1].setIndex(i-1);
            }
            else{
                let node = this.grid.shift()
                let value = node.getVal();
                console.log(value)
                this.insertVal(value);
                if(node==this.start){
                    this.start=null;
                }
                if(node==this.end){
                    this.end = null;
                }
                node.deleteNode();
            }
            i++;
        }
        this.grid = new_grid;
    }


    dfs(){
        if(this.start==null||this.end==null){
            alert("Start or End has not been set");
            return
        }
        let visit_nodes = Array(this.grid.length).fill(0);
        let s = [this.start];
        let curr;
        let edges;
        let adjacent;
        while(s.length>0){
            curr = s.pop();
            this.animation.push("a_"+curr.getId());
            this.animation.push("v_"+curr.getId());
            if(curr==this.end){
                break;
            }
            visit_nodes[curr.getIndex()] = 1;
            edges = curr.getAllEdges();
            for(let i=0;i<edges.length;i++){
                adjacent = edges[i].getAdjacent();
                if(visit_nodes[adjacent.getIndex()]==0){
                    s.push(adjacent);
                    visit_nodes[adjacent.getIndex()] = 1;

                }
            }
            this.animation.push("da_"+curr.getId());
        }
        if(curr!=this.end){
            this.animation.push("al_No Path has been found");
        }
        this.animation.push("c_"+curr.getId());

    }

    bfs(){
        if(this.start==null||this.end==null){
            alert("Start or End has not been set");
            return
        }
        let visit_nodes = Array(this.grid.length).fill(0);
        let q = [this.start];
        let curr;
        let edges;
        let adjacent;
        while(q.length>0){
            console.log(visit_nodes)
            curr = q.shift();
            this.animation.push("a_"+curr.getId());
            this.animation.push("v_"+curr.getId());
            if(curr==this.end){
                break;
            }
            edges = curr.getAllEdges();
            for(let i=0;i<edges.length;i++){
                adjacent = edges[i].getAdjacent();
                if(visit_nodes[adjacent.getIndex()]==0){
                    q.push(adjacent);
                    visit_nodes[adjacent.getIndex()] = 1;

                }
            }
            this.animation.push("da_"+curr.getId());
        }
        if(curr!=this.end){
            this.animation.push("al_No Path has been found");
        }
        this.animation.push("c_"+curr.getId());

    }

    dji(){
        if(this.start==null||this.end==null){
            alert("Start or End has not been set");
            return
        }
        let visit_nodes = Array(this.grid.length).fill(0);
        let pq = new heap_();
        let curr;
        let edges;
        let adjacent;
        while(q.length>0){
            console.log(visit_nodes)
            curr = q.shift();
            this.animation.push("a_"+curr.getId());
            this.animation.push("v_"+curr.getId());
            if(curr==this.end){
                break;
            }
            edges = curr.getAllEdges();
            for(let i=0;i<edges.length;i++){
                adjacent = edges[i].getAdjacent();
                if(visit_nodes[adjacent.getIndex()]==0){
                    q.push(adjacent);
                    visit_nodes[adjacent.getIndex()] = 1;

                }
            }
            this.animation.push("da_"+curr.getId());
        }
        if(curr!=this.end){
            this.animation.push("al_No Path has been found");
        }
        this.animation.push("c_"+curr.getId());

    }


}

////////////////////////////////////////////////////
class edge{
    constructor(node1,node2){
        this.val = 1;
        this.node1=node1;
        this.node2=node2;
        this.id = node1.getId()+"-"+node2.getId();
        this.svg = document.createElementNS('http://www.w3.org/2000/svg',"path"); 
        this.svg.setAttribute("stroke","black");
        this.svg.setAttribute("stroke-width","3");
        this.svg.setAttribute("fill","transparent");
        this.svg.id = this.id;
        this.svg.setAttribute("onclick","delete_edge("+this.id+")");
        did("gn-svg").appendChild(this.svg)
        this.input =null;
        let back_id = this.node2.getId()+"-"+this.node1.getId();
        let edge2 = this.node2.isEdgeExist(back_id);
        if(edge2){
            this.setBackedge(edge2);
            edge2.setBackedge(this);
            this.val = edge2.getVal();
        }
        else{
            this.backedge=null;
            this.input = document.createElement("input");
            this.input.setAttribute("type","number");
            this.input.className = "gn-valInput"
            this.input.setAttribute("oninput","change_edge_value("+this.node1.getIndex()+",'"+this.id+"',this)");
            this.input.id = "i_"+this.id;
            did("node_grid").appendChild(this.input)

        }
        console.log(this.val)
        this.draw_edge()
    }
  
    getId(){
        return this.id
    }
    getVal(){
        return this.val;
    }
    setVal(val){
        this.val = val;
        console.log(this)
        if(this.backedge!=null&&this.backedge.getVal()!=this.val){
            this.backedge.setVal(val);
        }
    }
    getAdjacent(){
        return this.node2;
    }
    deleteEdge(){
        if(this.backedge!=null){
            this.backedge.setBackedge(null);
        }
        this.svg.remove();
        if (this.input!=null){
            this.input.remove();
        }
        this.node1.deleteEdge(this.getId());
        this.node2.deleteBackEdge(this.getId());
    }
    resetInput(){
        if(this.input==null){
            return
        }
        this.input.setAttribute("oninput","change_edge_value("+this.node1.getIndex()+",'"+this.id+"',this)");

    }
    getInput(){
        return this.input;
    }

    getSVG(){
        return this.svg;
    }
    setBackedge(back_edge){
        this.backedge = back_edge;
    }
    getBackedge(){
        return this.backedge;
    }

    draw_edge(){

        ////Draw SVG///
        let x1 = this.node1.getPosition()[0]+this.node1.getNodeSize()/2;
        let y1 = this.node1.getPosition()[1]+this.node1.getNodeSize()/2-10;
        let x2 = this.node2.getPosition()[0]+this.node2.getNodeSize()/2;
        let y2 = this.node2.getPosition()[1]+this.node2.getNodeSize()/2-10;
        let theta;
        let arrl = 20;
        let yi;
        let xi;

        if(y1>y2){
            theta = Math.atan((y1-y2)/(x1-x2));
            if(x1>x2){
                theta = Math.PI-theta;
            }
            else{
                theta = theta*-1
                // theta = Math.atan((y1-y2)/(x2-x1));
            }
            if (theta<0){
                theta = theta+Math.PI*2;
            }
            var alpha1 = theta - Math.PI/6+Math.PI*2;
            var alpha2 = alpha1 + Math.PI/3;

        }
        else{
            theta = Math.atan((y2-y1)/(x1-x2))+Math.PI;
            if(x1>x2){

            }
            else{
                theta = Math.atan((y2-y1)/(x1-x2));
                // theta = Math.atan((y2-y1)/(x2-x1));
            }
            if (theta<0){
                theta = theta+Math.PI*2;
            }
            var alpha1 = theta - 7*Math.PI/6+Math.PI;
            var alpha2 = alpha1 + Math.PI/3;
        }

        let Mx = (x1+this.node1.getNodeSize()/2*Math.cos(-theta))
        let My = (y1+this.node1.getNodeSize()/2*Math.sin(-theta));
        let Lx = (x2+this.node2.getNodeSize()/2*Math.cos(Math.PI-theta))
        let Ly = (y2+this.node2.getNodeSize()/2*Math.sin(Math.PI-theta))
        let arrow = "L"+(Lx-Math.cos(alpha1)*(arrl))+" "+(Ly-Math.sin(alpha1)*(-1*arrl))+" M"+Lx +" "+Ly+"L"+(Lx-Math.cos(alpha2)*(arrl))+" "+(Ly-Math.sin(alpha2)*(-1*arrl))

        this.svg.setAttribute("d","M"+Mx+" "+My+", L"+Lx+" "+Ly+" "+arrow);

        ///Draw Input///
        if(this.input!=null){
            let gamma = theta;
            if(theta>Math.PI/2&&theta<3*Math.PI/2){
                gamma = theta-Math.PI;
            }
            console.log(theta);
            console.log(gamma)
    
            yi = Math.abs(Ly-My)/2+Math.min(Ly,My)-14.5;
            xi = Math.abs(Lx-Mx)/2+Math.min(Lx,Mx)-22.5;
            this.input.setAttribute("style","left:"+xi+"px;top:"+yi+"px; transform: rotateZ("+(gamma*-1)+"rad)")
            this.input.value = this.getVal();
        }
    }

}



//////////////////////////////////////
class node{
    ////constructor
    constructor(id,node_size,value){
        this.id =id;
        this.edges=[];
        this.backedges=[];
        this.val = value;
        this.nodeSize = node_size;
        this.index = 0;
        this.div = document.createElement('div');
        this.div.setAttribute("style","margin:"+node_size);
        this.div.className = "gn-select_node gn-draggable";
        this.div.id = id;
        this.div.setAttribute("index",this.index);
        this.div.innerHTML = value;

        this.posX = 0;
        this.posY = 0;
        // this.circle = document.createElementNS('http://www.w3.org/2000/svg',"circle");
        // this.circle.setAttribute("r","2");
        // did("gn-svg").appendChild(this.circle);
    }

    getId(){
        return this.id;
    }
    setVal(val){
        this.val = val;;
    }
    getVal(){
        return this.val;
    }
    getNodeSize(){
        return this.nodeSize;
    }
    setIndex(index){
        this.index = index;
        this.div.setAttribute("index",this.index);
        this.div.setAttribute("onmousedown","node_drag("+this.index+")");
        this.div.setAttribute("onmouseup","node_drag_stop()");
        this.div.className = "gn-select_node gn-draggable";

    }
    getIndex(){
        return this.index;
    }
    getDiv(){
        return this.div
    }
    setDiv(div){
        this.div = div;
    }
    isEdgeExist(id){
        for(let i=0;i<this.edges.length;i++){
            if(this.edges[i].getId()==id){
                return this.edges[i];
            }
        }
        return false
    }
    ////Forward edges////
    createEdge(node2){
        if(this.isEdgeExist(this.id+"-"+node2.getId())!=false){
            return
        }
        let e = new edge(this,node2)
        this.edges.push(e);
        node2.setBackEdges(e);
        
    }
    setAllEdges(edges){
        this.edges=edges;
    }
    getAllEdges(){
        return this.edges;
    }
    deleteEdge(id){
        let edge = [];
        for(let e in this.edges){
            console.log(this.edges[e])
            if(this.edges[e].getId()!=id){
                edge.push(this.edges[e]);
            }
        }
        this.edges = edge;
    }
    deleteBackEdge(id){
        let back_edge = [];
        for(let e in this.backedges){
            if(this.backedges[e].getId()!=id){
                back_edge.push(this.backedges[e]);
            }
        }
        this.backedges = back_edge;

    }

    setBackEdges(e){
        this.backedges.push(e);
    }
    getAllBackEdges(){
        return this.backedges;
    }

    deleteAllEdges(){
        let edges = this.getAllEdges();
        let backedges = this.getAllBackEdges();
        for(let i=0;i<edges.length;i++){
            edges[i].deleteEdge();
        }
        for(let i=0;i<backedges.length;i++){
            backedges[i].deleteEdge();
        }
    }

    deleteNode(){
        this.div.remove()
        this.deleteAllEdges();
    }
    updateNode(id,node_size,index){
        this.nodeSize = node_size;
        this.id = id;
        this.div.setAttribute("style","width:"+node_size+"px;height:"+node_size+"px")
        this.div.setAttribute("index",index)
        this.div.id = id;
    }
    setPositionCursor(x,y){
        this.posX = x-this.nodeSize/2;
        this.posY = y-this.nodeSize/2;
        this.div.setAttribute("style","width:"+this.nodeSize+"px;height:"+this.nodeSize+"px;left:"+this.posX+"px;top:"+this.posY+"px")
        // this.circle.setAttribute("cx",this.posX+this.nodeSize/2);
        // this.circle.setAttribute("cy",this.posY+this.nodeSize/2-10)
    }
    setPosition(x,y){
        this.posY = y;
        this.posX = x;
    }
    getPosition(){
        return [this.posX,this.posY]
    }
    duplicateNode(){
        let node_copy = new node(this.id,this.nodeSize);
        node_copy.setDiv(this.getDiv());
        node_copy.setVal(this.getVal());
        node_copy.setAllEdges(this.getAllEdges());
        node_copy.setPosition(this.getPosition()[0],this.getPosition()[1])
        return node_copy;
    }
}






////Interface for DOM////////


$(document).ready(function(){
    let height = window.innerHeight;
    let width = window.innerWidth;
    did("node_grid").setAttribute("style","position:absolute;height:"+height+"px;width:"+width+"px")
    did("gn-svg").setAttribute("style","height:"+height+"px;width:"+width+"px");
    // did("edgeVal").setAttribute("style","position:absolute;height:"+height+"px;width:"+width+"px")
    g = new graph();
    node1=null;
})


function algo(algo){
    did("run-button").setAttribute('onclick','choose_algo("'+algo.value+'")')
    let option = document.getElementsByTagName('option')
    for(let i=0;i<option.length;i++){
        if(option[i].value==algo.value){
            var title = option[i].innerHTML
        }
    }
    did('algo_title').innerHTML = title
}


function choose_algo(algo){
    undo_all_types();
    toggle_sidebar(did("settings"))
    let time = (new Date).getTime()
    if (algo == 'dfs'){
        g.dfs();
        animate(0);
    }
    else if(algo=="bfs"){
        g.bfs();
        animate(0)
    }

}


function choose_start(tag){
    let e = tag.classList.contains("active")
    let nodes = g.getAllNodes();
    undo_all_types()
    if(!e){
        tag.classList.add("active");
        for (let i=0;i<nodes.length;i++){
            nodes[i].getDiv().setAttribute("onclick","chooseStart(this)");
            nodes[i].getDiv().removeAttribute("onmousedown");
            nodes[i].getDiv().removeAttribute("onmouseup");
            nodes[i].getDiv().classList.remove("gn-draggable")

        }
    }
}

function chooseStart(tag){
    let node = g.getNode(tag.getAttribute('index'));
    g.setStart(node);
}


function choose_end(tag){
    let e = tag.classList.contains("active")
    let nodes = g.getAllNodes();
    undo_all_types();
    if(!e){
        tag.classList.add("active");
        for (let i=0;i<nodes.length;i++){
            nodes[i].getDiv().setAttribute("onclick","chooseEnd(this)");
            nodes[i].getDiv().removeAttribute("onmousedown");
            nodes[i].getDiv().removeAttribute("onmouseup");
            nodes[i].getDiv().classList.remove("gn-draggable")

        }
    }

}

function chooseEnd(tag){
    let node = g.getNode(tag.getAttribute('index'));
    g.setEnd(node);
}

function animate(loc){
        if(g.getAnimation().length==0||loc>g.getAnimation().length){
            return
        }
        /*
        * a_id = activate item with referenced id.
        * v_id = visit item with referenced id.
        * da_id = deactivate item with referenced id.
        * dv_id = devisit item with referenced id.
        */

        let action = g.getAnimation()[loc].split("_")[0];
        let id = g.getAnimation()[loc].split("_")[1];

        switch (action){
            case "a":
                did(id).classList.add("gn-active");
                break;
            case "v":
                did(id).classList.add("gn-visit");
                break;
            case "dv":
                did(id).classList.remove("gn-visit");
                break;
            case "da":
                did(id).classList.remove("gn-active");
                break;
            case "al":
                alert(id);
                break;
            case "c":
                g.clearAnimation();
                break;
        }

        setTimeout(function(){
            animate(loc+1);
        },speed);
}
////Drawing new Nodes functions////

function draw_node(action){
    if(node1==null){
        return
    }
    if(action=="new_node"){
        node1.setPositionCursor(window.mousex,window.mousey)
    }
    else if(action=="new_edge"){
    }
}

function setNode(){
    if(node1==null){
        return
    }
    g.addNode(node1);
    node1=null;
    let id = g.getNewId();
    let value = g.getNewVal();
    node1 = new node(id,did("node_size").value,value)
    did("node_grid").appendChild(node1.getDiv())
    node1.setPositionCursor(window.mousex,window.mousey)
}

function undo_all_types(){
    let inputs = qsa(".gn-valInput");
    let nodes = g.getAllNodes();
    let types = qsa(".fa-solid");
    let buttons = qsa(".start_end");
    types.forEach(type=>{
        if(type.classList.contains("active")){
            type.classList.remove("active");
        }
    })
    buttons.forEach(type=>{
        if(type.classList.contains("active")){
            type.classList.remove("active");
        }
    })
    nodes.forEach(node_=>{
        node_.getDiv().removeAttribute("onclick");
        node_.setIndex(node_.getIndex());

    })
    inputs.forEach(i=>{
        i.removeAttribute("onclick")
    })
    did("node_grid").removeAttribute("onclick")
    did("node_grid").removeAttribute("onmousemove")
    if(node1!=null){
        let value = node1.getVal()
        g.insertVal(value);
        node1.deleteNode();
        node1=null;
    };
    if(g.getStart()!=null){
        g.getStart().getDiv().classList.add("gn-start")
    }
    if(g.getEnd()!=null){
        g.getEnd().getDiv().classList.add("gn-end")
    }
}

function create_node(tag){
    let e = tag.classList.contains("active")
    undo_all_types();
    if(!e){
        tag.classList.add("active")
        let id = g.getNewId();
        let value = g.getNewVal();
        node1 = new node(id,did("node_size").value,value)
        did("node_grid").appendChild(node1.getDiv())
        node1.setPositionCursor(window.mousex,window.mousey)
        did("node_grid").setAttribute("onclick","setNode()");
        did("node_grid").setAttribute("onmousemove","draw_node('new_node')");
    }
}
/////Deleting Nodes////
function deleteNode(tag){
    let e = tag.classList.contains("active")
    undo_all_types();
    if(!e){
        let nodes = g.getAllNodes();
        tag.classList.add("active")
        nodes.forEach(node_=>{
            node_.getDiv().setAttribute("onclick","delete_node(this)");
            node_.getDiv().removeAttribute("onmousedown");
            node_.getDiv().removeAttribute("onmouseup");
            node_.getDiv().classList.remove("gn-draggable");


        })
    }
}

function delete_node(node_){
    let index = node_.getAttribute("index");
    g.removeNode(index);
}

///Drawing new Edges Functions
function create_edge(tag){
    let e = tag.classList.contains("active")
    undo_all_types()
    if(!e){
        let nodes = g.getAllNodes();
        tag.classList.add("active")
        nodes.forEach(node_=>{
            node_.getDiv().setAttribute("onclick","createEdge(this)");
            node_.getDiv().removeAttribute("onmousedown")
            node_.getDiv().removeAttribute("onmouseup")
            node_.getDiv().classList.remove("gn-draggable");

        })
        did("node_grid").setAttribute("onmousemove","draw_node('new_edge')");
        did("node_grid").setAttribute("index","drawEdge");

    }
}

////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////



function createEdge(tag){
    let index = tag.getAttribute("index");
    if(node1==null){
        node1=g.getNode(index);
    }
    else{
        let index1 = node1.getDiv().getAttribute("index")
        g.getNode(index1).createEdge(g.getNode(index));
        node1=null;
    }
}

function see_graph(){
    console.log(g);
}

function change_edge_value(index,id,tag){
    let node = g.getNode(index);
    let edge = node.isEdgeExist(id);
    if(edge){
        edge.setVal(tag.value);
    }
}


function delete_edge(tag){
    let e = tag.classList.contains("active")
    undo_all_types()
    if(!e){
        let input = qsa(".gn-valInput");
        tag.classList.add("active")
        input.forEach(i=>{
            let id = i.id.split("_")[1];
            let index = id.split('-')[0];
            i.setAttribute("onclick","deleteEdge("+index+",'"+id+"')");
        })
        did("node_grid").setAttribute("onmousemove","draw_node('new_edge')");
        did("node_grid").setAttribute("index","drawEdge");

    }
}

function deleteEdge(index,id){
    let n1 = g.getNode(index);
    console.log(n1)
    let edge = n1.isEdgeExist(id)
    if(edge){
        edge.deleteEdge();
        let backEdge = edge.getBackedge();
        if(backEdge!=null){
            backEdge.deleteEdge();
        }
    }
}

mousedown = false
interval = false
function node_drag(index){
    node1 = g.getNode(index);
    node1.getDiv().classList.remove("gn-draggable");
    node1.getDiv().classList.add("gn-dragging");
    interval = setInterval(() => {
    node1.setPositionCursor(window.mousex,window.mousey)
    let edges = node1.getAllEdges();
    let backedges = node1.getAllBackEdges();
    for(let i=0;i<edges.length;i++){
        edges[i].draw_edge();
    }
    for(let i=0;i<backedges.length;i++){
        backedges[i].draw_edge();
    }
}, 10);

}
function node_drag_stop(){
    mousedown=false;
    node1.getDiv().classList.remove("gn-dragging");
    node1.getDiv().classList.add("gn-draggable");
    clearInterval(interval);
    interval = false
    node1 = null;
}
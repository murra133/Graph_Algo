class graph{
    constructor(){
        this.grid=[];
        this.div = did("node_grid")
    }

    addNode(node1){
        this.grid.push(node1.duplicateNode());
        this.grid[this.grid.length-1].setIndex(this.grid.length-1);
        this.div.appendChild(this.grid[this.grid.length-1].getDiv())
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
                node.deleteNode();
            }
            i++;

        }
        this.grid = new_grid;
    }


}

////////////////////////////////////////////////////
class edge{
    constructor(node1,node2){
        this.val = 0;
        this.node1=node1;
        this.node2=node2;
        this.id = node1.getId()+"-"+node2.getId();
        this.div=null;
        this.draw_edge()
    }
  
    getId(){
        return this.id
    }
    getval(){
        return this.val;
    }
    setval(val){
        this.val = val;
    }
    getAdjacent(){
        return this.node2;
    }
    deleteEdge(){
        delete this;
    }
    getDiv(){
        return this.div;
    }

    draw_edge(){
        let back_id = this.node2.getId()+"-"+this.node1.getId();
        let x1 = this.node1.getPosition()[0]+this.node1.getNodeSize()/2;
        let y1 = this.node1.getPosition()[1]+this.node1.getNodeSize()/2-10;
        let x2 = this.node2.getPosition()[0]+this.node2.getNodeSize()/2;
        let y2 = this.node2.getPosition()[1]+this.node2.getNodeSize()/2-10;
        let theta;

        if(y1>y2){
            theta = Math.atan((y1-y2)/(x1-x2));
            if(x1>x2){
                console.log("y1>y2 x1>x2");
                theta = Math.PI-theta;
            }
            else{
                console.log("y1>y2 x2>x1");
                theta = theta*-1
                // theta = Math.atan((y1-y2)/(x2-x1));
            }
            if (theta<0){
                theta = theta+Math.PI*2;
            }
            var alpha1 = theta +5*Math.PI/6;
            var alpha2 = alpha1 +Math.PI/6;

        }
        else{
            theta = Math.atan((y2-y1)/(x1-x2))+Math.PI;
            if(x1>x2){
                console.log("y2>y1 x1>x2");
            }
            else{
                console.log("y2>y1 x2>x1");
                theta = Math.atan((y2-y1)/(x1-x2));
                // theta = Math.atan((y2-y1)/(x2-x1));
            }
            if (theta<0){
                theta = theta+Math.PI*2;
            }
            var alpha1 = theta - 7*Math.PI/6;
            var alpha2 = alpha1 + Math.PI/6;
        }


        let M = (x1+this.node1.getNodeSize()/2*Math.cos(-theta))+" "+(y1+this.node1.getNodeSize()/2*Math.sin(-theta));
        let Lx = (x2+this.node2.getNodeSize()/2*Math.cos(Math.PI-theta))
        let Ly = (y2+this.node2.getNodeSize()/2*Math.sin(Math.PI-theta))
        let arrow = "L"+(Lx+  Math.cos(alpha1)*30)+" "+(Ly-Math.sin(alpha1)*30)+" L"+Lx +" "+Ly+"L"+(Lx-Math.cos(alpha2)*30)+" "+(Ly-Math.sin(alpha2)*30)
        this.div = document.createElementNS('http://www.w3.org/2000/svg',"path"); 
        this.div.setAttribute("stroke","black");
        this.div.setAttribute("stroke-width","3");
        this.div.setAttribute("fill","transparent");
        this.div.id = this.id;
        this.div.setAttribute("d","M"+M+", L"+Lx+" "+Ly+arrow);
        console.log(theta*180/Math.PI)
        did("gn-svg").appendChild(this.div)

    }

}



//////////////////////////////////////
class node{
    ////constructor
    constructor(id,node_size){
        this.id =id;
        this.edges=[];
        this.val = 0;
        this.nodeSize = node_size;
        this.index = 0;
        this.div = document.createElement('div');
        this.div.setAttribute("style","margin:"+node_size);
        this.div.className = "gn-select_node";
        this.div.id = id;
        this.div.setAttribute("index",this.index);
        this.posX = 0;
        this.posY = 0;
        this.circle = document.createElementNS('http://www.w3.org/2000/svg',"circle");
        this.circle.setAttribute("r","2");
        did("gn-svg").appendChild(this.circle);
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
    createEdge(node2){
        if(this.isEdgeExist(this.id+"-"+node2.getId())!=false){
            return
        }
        this.edges.push(new edge(this,node2));
    }
    setAllEdges(edges){
        this.edges=edges;
    }
    getAllEdges(){
        return this.edges;
    }

    deleteNode(){
        this.div.remove()
        delete this;
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
        this.circle.setAttribute("cx",this.posX+this.nodeSize/2);
        this.circle.setAttribute("cy",this.posY+this.nodeSize/2-10)
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
    did("gn-svg").setAttribute("style","height:"+height+"px;width:"+width+"px")
    g = new graph();
    node1=null;
})

function draw_grid(){
    let node_size = parseInt(did("node_size").value);
    let viewx = did("view_port").offsetWidth;
    let viewy = did("view_port").offsetHeight;
    did("node_grid").setAttribute("style","width:"+viewx+"px; height:"+viewy+"px")
    let node_space = 30;
    let n_nodesx = Math.floor((viewx-node_space)/(node_size+node_space));
    let n_nodesy = Math.floor((viewy-node_space)/(node_size+node_space));
    g.graphResize(n_nodesx,n_nodesy,node_size,node_space);
}

function update_node(node,node_size){
    node.setAttribute("style","width:"+node_size+"px;height:"+node_size+"px")
}
function create_empty_node(id,node_size){
    let node = document.createElement('div');
    node.setAttribute("style","width:"+node_size+"px;height:"+node_size+"px");
    node.setAttribute("onclick","select_node(this)")
    node.className = "gn-blank_node";
    node.id = id;
    return node;
}
function create_empty_node_row(id){
    let row = document.createElement("div");
    row.className = "gn-node_row";
    row.id = id;
    return row;
}



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
    node1 = new node(id,did("node_size").value)
    did("node_grid").appendChild(node1.getDiv())
    node1.setPositionCursor(window.mousex,window.mousey)
}

function undo_all_types(){
    let nodes = g.getAllNodes();
    let types = qsa(".fa-solid");
    types.forEach(type=>{
        if(type.classList.contains("active")){
            type.classList.remove("active");
        }
    })
    nodes.forEach(node_=>{
        node_.getDiv().removeAttribute("onclick");
    })
    did("node_grid").removeAttribute("onclick")
    did("node_grid").removeAttribute("onmousemove")
    if(node1!=null){
        node1.deleteNode();
        node1=null;
    };
}

function create_node(tag){
    if(tag.classList.contains("active")){
        tag.classList.remove("active");
        node1.deleteNode();
        node1=null;
        return
    }
    else{
        undo_all_types();
        tag.classList.add("active")
        let id = g.getNewId();
        node1 = new node(id,did("node_size").value)
        did("node_grid").appendChild(node1.getDiv())
        node1.setPositionCursor(window.mousex,window.mousey)
        did("node_grid").setAttribute("onclick","setNode()");
        did("node_grid").setAttribute("onmousemove","draw_node('new_node')");


    }
}

////////////////////////////////////////////////////////////
function deleteNode(tag){
    let nodes = g.getAllNodes();
    if(tag.classList.contains("active")){
        tag.classList.remove("active");
        nodes.forEach(node_=>{
            node_.getDiv().removeAttribute("onclick");
        })
        return
    }
    else{
        undo_all_types();
        tag.classList.add("active")
        nodes.forEach(node_=>{
            node_.getDiv().setAttribute("onclick","delete_node(this)");
        })
    }
}

function delete_node(node_){
    let index = node_.getAttribute("index");
    g.removeNode(index);
}
//////////////////////////////////////////////////////////////////

function create_edge(tag){
    let nodes = g.getAllNodes();
    if(tag.classList.contains("active")){
        tag.classList.remove("active");
        nodes.forEach(node_=>{
            node_.getDiv().removeAttribute("onclick");
        })
        return
    }
    else{
        undo_all_types();
        tag.classList.add("active")
        nodes.forEach(node_=>{
            node_.getDiv().setAttribute("onclick","createEdge(this)");
        })
        did("node_grid").setAttribute("onmousemove","draw_node('new_edge')");

    }
}

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
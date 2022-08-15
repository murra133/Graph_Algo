
class heap_{

    constructor(start_heap){
        ///Start Heap is always an array within an array, values to compare are in the first position [[]]
        this.heap = start_heap;
    }
    hp_resize(){
        let nhp = [];
        let len = this.getLength()
        for(let i = 0;i<this.heap.length;i++){
            nhp.push(Array(len*2).fill(null));
            for(let k=0;k<this.heap[i].length;k++){
                nhp[i][k] = this.heap[i][k];
            }
            this.heap[i] = nhp[i];
        }
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
            if(this.heap[0][this.get_left_child(loc)]==null||this.heap[0][this.get_left_child(loc)]==undefined){
                return false;
            }
        }
        else{
            if(this.heap[0][this.get_right_child(loc)]==null||this.heap[0][this.get_right_child(loc)]==undefined){
                return false;
            }
        }
        return true;
    }
    getLength(){
        return this.heap[0].length;
    }
    getint(loc){
        let val;
        if(isNaN(parseFloat(this.heap[0][loc]))){
            val = this.heap[0][loc].charCodeAt(0)
        }
        else{
            val = parseFloat(this.heap[0][loc])
        }
        return val;
    }
    hp_insert(val){
        let loc = 0;
        if(this.heap[0][this.getLength()-1]!=null){
            this.hp_resize();
        }

        for(let i=1;i<this.getLength();i++){
            if(this.heap[0][i]==null){
                this.hp_copy_ins(i,null,val);
                loc = i;
                break
            }
        }
        this.heapify_up(loc);
    }
    hp_copy_ins(loc,fin,val){
        if(fin==null){
            for(let i =0;i<this.heap.length;i++){
                this.heap[i][loc] = val[i];
            }
        }
        else{
            for(let i=0;i<this.heap.length;i++){
                let temp = this.heap[i][loc];
                this.heap[i][loc]=this.heap[i][fin];
                this.heap[i][fin]=temp;
            }
        }
    }

    hp_remove(){
        console.log(this.heap[0])
        if(this.heap.length>1){
            console.log(this.heap[1])
        }
        let loc =this.getLength()-1;
        for(let i=1;i<this.getLength();i++){
            if(this.heap[0][i]==null){
                loc=i-1;
                break;
            }
        }

        this.hp_copy_ins(1,loc,null);
        let min =[];
        let n = Array(this.heap.length).fill(null);
        for(let i=0;i<this.heap.length;i++){
            min.push(this.heap[i][loc]);
        }
        this.hp_copy_ins(loc,null,n);
        this.heapify_down(1);
        return min;
    }
    hp_peak(){
        return this.heap[0][1]
    }
    heapify_up(curr){
        let parent = this.get_parent(curr);
        this.heap[0]
        while(parent>0&&this.getint(parent)>this.getint(curr)){
            this.hp_copy_ins(curr,parent,null);
            curr = parent;
            parent = this.get_parent(curr)
            if(parent<1){
                break;
            }
        }
    
    }
    heapify_down(curr){
        if(!this.child_defined("l",curr)&&!this.child_defined("r",curr)){
            return;
        }
        let left;
        let right;      
        while(this.child_defined("l",curr)&&this.child_defined("r",curr)){
            left = this.get_left_child(curr);
            right = this.get_right_child(curr); 
            if(this.getint(left)>this.getint(curr)&&this.getint(right)>this.getint(curr)){
                curr=this.getLength()-1;
                break;
            }
            else{
                if(this.getint(left)<this.getint(right)){
                    this.hp_copy_ins(curr,left,null)
                    curr=left;
                }
                else{
                    this.hp_copy_ins(curr,right,null);
                    curr=right;
                }
            }
        }
    }
}

class graph{
    constructor(div_id){
        this.start=null;
        this.end=null;
        this.animation = [];
        this.grid=[];
        this.div = did(div_id)
        this.val = new heap_([[-1, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'M', 'N', 'L', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', null, null, null, null, null]])
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
            g.start.setDist("INF");
        }
        if(g.start==node){
            g.start=null;
        }
        else{
            g.start=node;
            g.start.getDiv().classList.add("gn-start")
            g.start.setDist("0");
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
        this.animation = [];
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

    resetDist(action){
        let nodes = this.getAllNodes();
        for(let n in nodes){
            if(action=="hide"){
                nodes[n].hideDist();
            }
            else{
                nodes[n].setDist("INF");
            }
        }
        if(this.start!=null&&action!="hide"){
            this.start.setDist(0);
        }
    }

    clear(){
        this.start = null;
        this.end = null;
        while(this.grid.length>0){
            this.removeNode(0);
        }
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
        let dist = Array(this.grid.length).fill(Infinity);
        let parent = Array(this.grid.length).fill(-1);
        dist[this.start.getIndex()] = 0;
        let edges = this.start.getAllEdges();
        let pq = new heap_([[-1],[-1]]);
        for(let i=0;i<edges.length;i++){
            let node2 = edges[i].getAdjacent();
            if(dist[node2.getIndex()]>(dist[this.start.getIndex()]+edges[i].getVal())){
                dist[node2.getIndex()]=(dist[this.start.getIndex()]+edges[i].getVal());
                this.animation.push("v_"+node2.getId()+"_"+edges[i].getId());
                this.animation.push("sw_"+node2.getIndex()+"_"+dist[node2.getIndex()]);
                pq.hp_insert([dist[node2.getIndex()],edges[i]]);
                parent[node2.getIndex()]=this.start.getIndex();
            }
        }
        let edge;
        let curr;
        while(pq.hp_peak()!=null){
            let v = pq.hp_remove();
            edge = v[1];
            console.log(edge);
            curr = edge.getAdjacent();
            if(visit_nodes[curr.getIndex()]==1){
                continue;
            }
            this.animation.push("a_"+curr.getId()+"_"+edge.getId());
            visit_nodes[curr.getIndex()]=1;
            if(curr==this.end){
                break;
            }

            edges = curr.getAllEdges();
            for(let i=0;i<edges.length;i++){
                let node2 = edges[i].getAdjacent();
                if(dist[node2.getIndex()]>(dist[curr.getIndex()]+edges[i].getVal())){
                    dist[node2.getIndex()]=(dist[curr.getIndex()]+edges[i].getVal());
                    pq.hp_insert([dist[node2.getIndex()],edges[i]]);
                    parent[node2.getIndex()]=curr.getIndex();
                    this.animation.push("v_"+node2.getId()+"_"+edges[i].getId());
                    this.animation.push("sw_"+node2.getIndex()+"_"+dist[node2.getIndex()]);
                }
            }
            this.animation.push("da_"+curr.getId()+"_"+edge.getId());
        }
        if(curr!=this.end){
            this.animation.push("al_No Path has been found");
        }
        else{
            while(parent[curr.getIndex()]!=this.start.getIndex()){
                let edge_id = (this.getNode(parent[curr.getIndex()])).getId()+"-"+curr.getId();
                curr = this.getNode(parent[curr.getIndex()]);
                this.animation.push("a_"+curr.getId()+"_"+edge_id);
            }
            let edge_id = (this.getNode(parent[curr.getIndex()])).getId()+"-"+curr.getId();
            this.animation.push("a_"+this.start.getId()+"_"+edge_id);

        }        
        this.animation.push("c_"+curr.getId());


    }


    inSameSet(set,loc1,loc2){
        let p1 = loc1;
        let p2 = loc2;
        let c1=0;
        let c2=0;
        while(set[p1]!=-1){
            p1 = set[p1];
            c1++;
        }
        while(set[p2]!=-1){
            p2 = set[p2];
            c2++;
        }
        if(p2==p1){
            return true;
        }
        else{
            if(c1>c2){
                set[p2] = p1;
            }
            else{
                set[p1] = p2;
            }
            return set;
        }
    }

    prim(){
        if(this.start==null){
            alert("Please choose a start: ")
            return;
        }
        let visited = Array(this.grid.length).fill(0);
        visited[this.start.getIndex()] = 1;
        let pq = new heap_([[-1],[-1]]);
        let edges = this.start.getAllEdges();
        let dist = Array(this.grid.length).fill(0);
        for(let i=0;i<edges.length;i++){
            let node2 = edges[i].getAdjacent();
            dist[node2.getIndex()]=(dist[this.start.getIndex()]+edges[i].getVal());
            pq.hp_insert([edges[i].getVal(),edges[i]]);
        }
        let curr;
        let edge;
        while(pq.hp_peak()!=null){
            let v = pq.hp_remove();
            edge = v[1];
            curr = edge.getAdjacent();
            if(visited[curr.getIndex()]!=1){
                visited[curr.getIndex()]=1;
                this.animation.push("b_"+curr.getId()+"_"+edge.getId());
                this.animation.push("sw_"+curr.getIndex()+"_"+dist[curr.getIndex()]);
                edges = curr.getAllEdges();
                for (let i=0;i<edges.length;i++){
                    let node2 = edges[i].getAdjacent();
                    dist[node2.getIndex()]=(dist[curr.getIndex()]+edges[i].getVal());
                    pq.hp_insert([edges[i].getVal(),edges[i]]);
                    
                }
            }
        }
        this.animation.push("c_"+1);
    }

    krusk(){
        let parent = Array(this.grid.length).fill(-1);
        let pq = new heap_([[-1],[-1]]);
        let nodes = this.getAllNodes();
        for(let i in nodes){
            let edges = nodes[i].getAllEdges();
            for(let e in edges){
                pq.hp_insert([edges[e].getVal(),edges[e]]);
            }
        }
        let node1;
        let node2;
        let edge;
        while(pq.hp_peak()!=null){
            let v = pq.hp_remove();
            edge = v[1];
            node1 = edge.getInitial();
            node2 = edge.getAdjacent();
            let ss = this.inSameSet(parent,node1.getIndex(),node2.getIndex());
            if(ss!=true){
                parent = ss;
                this.animation.push("bn_"+node1.getId());
                this.animation.push("b_"+node2.getId()+"_"+edge.getId());
            }
        }
        this.animation.push("c_1");
    }
    bellFord(){
        if(this.start==null||this.end==null){
            alert("Start or End has not been set");
            return
        }
       let edges = [];
       let i;
       let visits = Array(this.grid.length).fill(0);
       let parent = Array(this.grid.length).fill(-1);
       let q = [this.start];
       while(q.length>0){
        let node = q.shift();
        visits[node.getIndex()]=1;
        let e = node.getAllEdges();
        for(i in e){
            edges.push(e[i]);
            let node2 = e[i].getAdjacent();
            if(visits[node2.getIndex()]==0){
                q.push(node2);
                visits[node2.getIndex()]=1;
            }
        }
        }
        let n =0;
        let c =0;
        let dist = Array(this.grid.length).fill(Infinity);
        dist[this.start.getIndex()] = 0;
        while(n<this.grid.length&&c==n){
            for(i in edges){
                let node1 = edges[i].getInitial();
                this.animation.push("v_"+node1.getId())
                let node2 = edges[i].getAdjacent();
                this.animation.push("v_"+node2.getId()+"_"+edges[i].getId());
                if((dist[node1.getIndex()]+edges[i].getVal())<dist[node2.getIndex()]){
                    parent[node2.getIndex()] = node1.getIndex();
                    dist[node2.getIndex()]=dist[node1.getIndex()]+edges[i].getVal();
                    this.animation.push("sw_"+node2.getIndex()+"_"+dist[node2.getIndex()]);
                    c=n+1;
                }

            }
            this.animation.push("r_#_#");
            n++;
        }
        if(c==n){
            this.animation.push("al_Infinite Loop Found, No Solution");
        }
        else{
            this.animation.pop();
            let curr = this.end;
            this.animation.push("a_"+this.end.getId()+"_+");
            while(parent[curr.getIndex()]!=this.start.getIndex()){
                let edge_id = (this.getNode(parent[curr.getIndex()])).getId()+"-"+curr.getId();
                curr = this.getNode(parent[curr.getIndex()]);
                this.animation.push("a_"+curr.getId()+"_"+edge_id);
            }
            let edge_id = (this.getNode(parent[curr.getIndex()])).getId()+"-"+curr.getId();
            curr = this.getNode(parent[curr.getIndex()]);
            this.animation.push("a_"+curr.getId()+"_"+edge_id);
            this.animation.push("al_Solution Has Been Found");
        }
        this.animation.push("c_1");
    }


}

////////////////////////////////////////////////////
class edge{
    constructor(node1,node2){
        this.val = 1;
        this.node1=node1;
        this.node2=node2;
        this.id = node1.getId()+"-"+node2.getId();
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
            if(did("node_grid")!=undefined){
                did("node_grid").appendChild(this.input)
            }

        }
        if(node1!=node2){
            this.draw_edge()
        }
    }
  
    getId(){
        return this.id
    }
    getVal(){
        return parseInt(this.val);
    }
    setVal(val){
        this.val = val;
        if(this.backedge!=null&&this.backedge.getVal()!=this.val){
            this.backedge.setVal(val);
        }
    }
    getInitial(){
        return this.node1;
    }
    getAdjacent(){
        return this.node2;
    }
    setInitial(node1){
        this.node1 = node1;
    }
    setAdjacent(node2){
        this.node2 = node2;
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

    draw_edge_cursor(x2,y2){
        let x1 = this.node1.getPosition()[0]+this.node1.getNodeSize()/2;
        let y1 = this.node1.getPosition()[1]+this.node1.getNodeSize()/2-10;
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
        let Lx = (x2)
        let Ly = (y2)
        let arrow = "L"+(Lx-Math.cos(alpha1)*(arrl))+" "+(Ly-Math.sin(alpha1)*(-1*arrl))+" M"+Lx +" "+Ly+"L"+(Lx-Math.cos(alpha2)*(arrl))+" "+(Ly-Math.sin(alpha2)*(-1*arrl))

        this.svg.setAttribute("d","M"+Mx+" "+My+", L"+Lx+" "+Ly+" "+arrow);

        ///Draw Input///
        if(this.input!=null){
            let gamma = theta;
            if(theta>Math.PI/2&&theta<3*Math.PI/2){
                gamma = theta-Math.PI;
            }
    
            yi = Math.abs(Ly-My)/2+Math.min(Ly,My)-14.5;
            xi = Math.abs(Lx-Mx)/2+Math.min(Lx,Mx)-22.5;
            this.input.setAttribute("style","left:"+xi+"px;top:"+yi+"px; transform: rotateZ("+(gamma*-1)+"rad)")
            this.input.value = this.getVal();
        }
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
        this.dist = document.createElement("p");
        this.dist.className = "gn-dist gn-hidden";
        this.dist.setAttribute("style","left:"+(node_size/2)+"px;top:"+(-node_size)+"px")
        this.div.appendChild(this.dist);
        this.dist.innerHTML = "INF";
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

    setDist(val){
        this.div.children[0].classList.remove("gn-hidden");
        this.div.children[0].innerHTML = val;
    }
    hideDist(){
        this.div.children[0].classList.add("gn-hidden");
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
        this.div.remove();
        this.dist.remove();
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
    if(did("main_body")!=undefined){
        return
    }
    let height = window.innerHeight;
    let width = window.innerWidth;
    did("node_grid").setAttribute("style","position:absolute;height:"+height+"px;width:"+width+"px")
    did("gn-svg").setAttribute("style","height:"+height+"px;width:"+width+"px");
    // did("edgeVal").setAttribute("style","position:absolute;height:"+height+"px;width:"+width+"px")
    g = new graph("node_grid");
    node1=null;
})

function reset_gn(){
    undo_all_types();
}
function clear_gn(){
    g.clear();
}

function algo(algo){
    did("run-button").setAttribute('onclick','choose_algo("'+algo.value+'")')
    let option = document.getElementsByTagName('option')
    let svg = qsa("path");
    let nodes = qsa(".gn-select_node");
    svg.forEach(a=>{
        a.removeAttribute("style");
    })
    nodes.forEach(n=>{
        n.classList.remove("gn-node_opacity2")
    })
    let se = qsa(".start_end"); 
    let p = did("start_end_text");
    p.innerHTML = "Choose Start and End"
    se[0].removeAttribute("style");
    se[1].removeAttribute("style");
    for(let i=0;i<option.length;i++){
        if(option[i].value==algo.value){
            var title = option[i].innerHTML
        }
    }
    did('algo_title').innerHTML = title
    if(algo.value=="dji"||algo.value=="bf"){
        let nodes = g.getAllNodes();
        for(let i=0;i<nodes.length;i++){
            nodes[i].setDist("INF");
        }
        if(g.getStart()!=null){
            g.getStart().setDist(0);
        }
    }
    else if(algo.value=="prim"||algo.value=="krusk"){
        se[1].setAttribute("style","display:none");
        p.innerHTML = "Choose Start"
        if(algo.value=="krusk"){
            p.innerHTML = "";
            se[0].setAttribute("style","display:none");

        }
        g.resetDist();
        svg.forEach(a=>{
            a.setAttribute("style","opacity:0.2");
        })
        nodes.forEach(n=>{
            n.classList.add("gn-node_opacity2")
        })
    }
}


function choose_algo(algo){
    undo_all_types();
    toggle_sidebar(did("settings"))
    let time = (new Date).getTime()
    if (algo == 'dfs'){
        g.dfs();
    }
    else if(algo=="bfs"){
        g.bfs();
    }
    else if(algo=="dji"){
        g.dji();
    }
    else if(algo=="prim"){
        g.prim();
    }
    else if(algo=="krusk"){
        g.krusk();
    }
    else if(algo=="bf"){
        console.log("RUNNING")
        g.bellFord();
    }
    animate(0);


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
        * sw_index_val = sets weight, pass in index of node and value
        */

        let action = g.getAnimation()[loc].split("_")[0];
        let id = g.getAnimation()[loc].split("_")[1];
        let edge_id = g.getAnimation()[loc].split("_")[2]
        let e = 1;
        if(did(edge_id)==null){
            e=0;
        }

        switch (action){
            case "a":
                did(id).classList.add("gn-active");
                if(e){
                    did(edge_id).setAttribute("stroke","orange");
                }
                break;
            case "v":
                did(id).classList.add("gn-visit");
                if(e){
                did(edge_id).setAttribute("stroke","lightblue");
                }
                break;
            case "dv":
                did(id).classList.remove("gn-visit");
                if(e){
                did(edge_id).setAttribute("stroke","black");
                }
                break;
            case "da":
                did(id).classList.remove("gn-active");
                if(e){
                did(edge_id).setAttribute("stroke","lightblue");
                }
                break;
            case "al":
                alert(id);
                break;
            case "sw":
                let val = g.getAnimation()[loc].split("_")[2];
                let node = g.getNode(parseInt(id))
                node.setDist(val);
                break;
            case "b":
                did(id).classList.remove("gn-node_opacity2");
                did(edge_id).removeAttribute("style")
                break;
            case "bn":
                did(id).classList.remove("gn-node_opacity2");
                break;
            case "c":
                g.clearAnimation();
                break;
            case "r":
                reset_styles_only();
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

function reset_styles_only(){
    let nodes = g.getAllNodes();
    let svg = qsa("path");
    svg.forEach(a=>{
        a.setAttribute("stroke","black")
    })
    nodes.forEach(node_=>{
        let div = node_.getDiv();
        div.classList.remove("gn-visit");
        div.classList.remove("gn-active")
    });
}

function undo_all_types(){
    g.clearAnimation();
    if(did("algo").value=="bfs"||did("algo").value=="dfs"){
        g.resetDist("hide");
    }
    else{
        g.resetDist("set")
    }
    let inputs = qsa(".gn-valInput");
    let nodes = g.getAllNodes();
    let types = qsa(".fa-solid");
    let buttons = qsa(".start_end");
    let svg = qsa("path");
    svg.forEach(a=>{
        a.setAttribute("stroke","black")
    })
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
        if(did("algo").value=="prim"||did("algo").value=="krusk"){
            node_.getDiv().classList.add("gn-node_opacity2")
        }

    })
    inputs.forEach(i=>{
        i.removeAttribute("onclick")
    })
    did("node_grid").removeAttribute("onclick")
    did("node_grid").removeAttribute("onmousemove")
    if(node1!=null){
        let value = node1.getVal()
        g.insertVal(value);
        if(g.getNode(node1.getIndex())==node1){
            node1=null;
        }
        else{
            node1.deleteNode();
            node1=null;
        }

    };

    if(edge1!=null){
        edge1.deleteEdge();
        edge1 = null;
    }
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
        did("node_grid").setAttribute("onmousemove","drawEdge()");
        did("node_grid").setAttribute("index","drawEdge");

    }
}

////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////

edge1 = null;

function createEdge(tag){
    let index = tag.getAttribute("index");
    if(node1==null){
        node1=g.getNode(index);
        edge1 = new edge(node1,node1);


    }
    else{
        if(node1==g.getNode(index)){
            node1=null;
            edge1.deleteEdge();
            edge1 = null;
        }
        else{
            let index1 = node1.getDiv().getAttribute("index")
            g.getNode(index1).createEdge(g.getNode(index));
            node1=g.getNode(index);
            edge1.setInitial(node1);
            edge1.setAdjacent(node1);
            this.draw_edge_cursor(window.mousex,window.mousey)
        }

    }
}

function drawEdge(){
    if(edge1==null){
        return;
    }
    else{
        edge1.draw_edge_cursor(window.mousex,window.mousey)
    }

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
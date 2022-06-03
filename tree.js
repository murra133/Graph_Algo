//tree variables//
// tree=[-1,null,null,null,null,null,null,null]; //-1 the First node is not the root, the root will always be located at position 1//
tree = [-1,null]
selected_node = "";
animation_array=[];

function get_right_child(location){
    ///Location of node as int///
    return location*2+1;
}
function get_left_child(location){
    ///Location of node as int///
    return location*2;
}
function child_defined(side,loc){
    //l = left, r= right;
    if(side=="l"){
        if(tree[get_left_child(loc)]==null||tree[get_left_child(loc)]==undefined){
            return false;
        }
    }
    else{
        if(tree[get_right_child(loc)]==null||tree[get_right_child(loc)]==undefined){
            return false;
        }
    }
    return true;
}
function get_parent(location){
    return Math.floor(location/2)
}

function get_all_children(loc,array){
    if(tree[loc]==null){
        return array
    }
    array.push(tree[loc]);
    tree[loc]=null;
    if(child_defined("l",loc)){
        array = get_all_children(get_left_child(loc),array);
    }
    if(child_defined("r",loc)){
        array = get_all_children(get_right_child(loc),array);
    }
    return array;
}
///Functions to draw a tree///
function tree_width(height){
    if(height==0){
        return 1
    }
    let width = Array(height);
    width[0]=1;
    for(let i=1;i<height;i++){
        width[i] = width[i-1]*2;
    }
    return width[height-1];
}

function concat_tree(){
    let string = "";
    for(let i =1;i<tree.length-1;i++){
        if(tree[i]!=null){
            string = string+tree[i]+" "
        }
    }
    return string+tree[tree.length-1];
}

function tree_height(tree_length){
    return Math.floor(Math.log2(tree_length))
}

function write_tree(value){
    if(value=="");
}
function draw_tree(){
    let tree_port = did("tree"); 
    let height = tree_height(tree.length);
    let width = tree_width(height);
    let node_size = 40;
    let node_space = 10;

    tree_port.setAttribute("style","row-gap:"+node_space+"px")
    //Node Sample//
    let node = document.createElement('div');
    node.setAttribute("class","tree_node node_clickable");
    node.setAttribute("ondblclick","delete_node(this)");
    node.setAttribute("style","height:"+node_size+"px; width:"+node_size+"px");
    let val = document.createElement("h4");
    val.setAttribute("class","node_value");
    node.appendChild(val);

    //Viewport levels//
    let level = document.createElement('div');
    level.setAttribute("class","tree_levels")
    l=-1;

    ///Initialize copy values//
    let level_copy;
    let node_copy;
    for(let i=1;i<tree.length;i++){
        if(tree_height(i)>l){
            l++;
            level_copy = level.cloneNode(true);
            level_copy.id = "l_"+l
            // level.setAttribute("style","column-gap:"+node_space+"px");
            tree_port.appendChild(level_copy)
        }
        if(tree[i]!=null){
            node_copy = node.cloneNode(true);
            node_copy.children[0].innerHTML = tree[i];
            node_copy.id = "n_"+i;
            node_copy.setAttribute("onclick","select_node('n_"+i+"')");
            level_copy.appendChild(node_copy);
        }
        else{
            node_copy = node.cloneNode(true);
            node_copy.setAttribute("class","blank_node");
            node_copy.setAttribute("style","height:"+(node_size+1)+"px; width:"+(node_size+1)+"px");
            node_copy.id = "n_"+i;
            level_copy.appendChild(node_copy);
        }
    }
    draw_edge()
}

function dist(x1,x2,y1,y2){
    x1 = parseInt(x1);
    x2 = parseInt(x2);
    y1 = parseInt(y1);
    y2 = parseInt(y2);

    return(Math.sqrt(parseFloat(((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)))))
}

function get_degree(radians){
    return (radians*180/3.14)
}
function edge_rotation(ptop,pleft,ctop,cleft,width){
    ///Gets position of top and left from a node, returns rotation angle in degrees
    let diff_top = ptop-ctop;
    let diff_left = pleft-cleft;
    return Math.atan(diff_top/diff_left);

}

function get_offset(element){
    //type can be either left, right, top, bottom//
    var bodyRect = document.body.getBoundingClientRect();
    let elemRect = element.getBoundingClientRect();
    offset = {
        "top":(elemRect.top - bodyRect.top),
        "left":(elemRect.left - bodyRect.left),
        "right":(elemRect.right - bodyRect.right),
        "bottom":(elemRect.bottom - bodyRect.bottom)}
    return offset;
}

function draw_edge(){

    let height = tree_height(tree.length);
    let t_width = tree_width(height);
    let node_size = parseInt(document.getElementsByClassName('tree_node')[0].offsetWidth)/2;
    let edge_port = did('edges');
    removeAllChildNodes(edge_port);
    let edge = document.createElement("div")
    edge.setAttribute("class","tree_edge");
    let dot1 = document.createElement("div");
    dot1.className = "dot";
    let dot2 = document.createElement("div");
    dot2.className = "dot";
    let dot3 = document.createElement("div");
    dot3.className = "dot";    
    for (let i=1;i<tree.length;i++){
        if(tree[i]!=null){
            let offset1 = get_offset(did("n_"+i));
            //Draw left//
            if(tree[i*2]!=null){
                let offset2 = get_offset(did("n_"+(i*2)));
                offset1.top = offset1.top +node_size
                offset1.left = offset1.left +node_size
                offset2.left = offset2.left +node_size
                offset2.top = offset2.top +node_size
                let edge_copy = edge.cloneNode(true);
                edge_copy.id = i+"_"+(i*2);

                let width = dist(offset1.left,offset2.left,offset1.top,offset2.top);
                let rotation = edge_rotation(offset1.top,offset1.left,offset2.top,offset2.left)
                let pos_top = offset1.top+(offset2.top-offset1.top)/2;
                let pos_left = offset2.left+(offset1.left-offset2.left)/2-width/2

                edge_copy.setAttribute("style","width:"+width+"px; top:"+pos_top+"px; left:"+pos_left+"px;transform: rotateZ("+get_degree(rotation)+"deg)");
                edge_port.appendChild(edge_copy);
            }
            //draw_right//
            if(tree[i*2+1]!=null){
                let offset2 = get_offset(did("n_"+(i*2+1)));
                if(tree[get_left_child(get_parent(i*2+1))]==null||tree[get_left_child(get_parent(i*2+1))]==undefined){
                    offset1.top = offset1.top +node_size
                    offset1.left = offset1.left +node_size
                }
                else{
                    // console.log(get_left_child(get_parent(i)))
                    // console.log(tree)
                    offset1.top = offset1.top
                    offset1.left = offset1.left
                }
                offset2.left = offset2.left+node_size
                offset2.top = offset2.top+node_size
                // console.log(offset1)
                // dot1.setAttribute("style","top:"+offset1.top+"px; left:"+offset1.left+"px;")
                // did("view_port").appendChild(dot1);
                // dot2.setAttribute("style","top:"+offset2.top+"px; left:"+offset2.left+"px;")
                // did("view_port").appendChild(dot2);
                let edge_copy = edge.cloneNode(true);
                edge_copy.id = i+"_"+(i*2+1);
                let width = dist(offset1.left,offset2.left,offset1.top,offset2.top);
                let rotation = edge_rotation(offset1.top,offset1.left,offset2.top,offset2.left)
                let pos_top = offset1.top+(offset2.top-offset1.top)/2;
                let pos_left = offset1.left+(offset2.left-offset1.left)/2-width/2
                // dot3.setAttribute("style","top:"+pos_top+"px; left:"+pos_left+"px;")
                // did("view_port").appendChild(dot3);
                edge_copy.setAttribute("style","width:"+width+"px; top:"+pos_top+"px; left:"+pos_left+"px; transform: rotateZ("+get_degree(rotation)+"deg)");
                edge_port.appendChild(edge_copy);
            }
        }
    }
}
function remove_tree(){
    removeAllChildNodes(did('tree'));
    removeAllChildNodes((did('edges')))
    removeAllChildNodes((did('balance')))
}


function choose_data_structure(input){
    let dt = input.value;
    tree=[-1,null];
    did("input_tree").value="";
    remove_tree()
    let insert_div = did("tree_values")
    removeAllChildNodes(insert_div);
    let tree_algo = did("tree_algo");
    let algo_input = did("bt_algo");
    let p = document.createElement("p");
    p.innerHTML = "Add Nodes:"
    let palgo = document.createElement("p");
    palgo.innerHTML = "Select Algorithm to Run";
    if(dt=="bst"||dt=="avl"){
        if(dt=="avl"){
            did("algo_title").innerHTML = "AVL Tree"
        }
        else{
            did("algo_title").innerHTML = "Binary Search Tree"
        }
        let insert_node = create_addNodes("node",dt);
        insert_div.appendChild(p);
        insert_div.appendChild(insert_node);
        removeAllChildNodes(algo_input);
        let select_find = document.createElement("option");
        select_find.value = "bst_find";
        select_find.innerHTML = "Find"
        let select_delete = document.createElement("option");
        select_delete.value = "bst_del";
        select_delete.innerHTML = "Delete"
        algo_input.appendChild(select_find);
        algo_input.appendChild(select_delete);
        let input_tag = document.createElement("input");
        input_tag.setAttribute("type","text");
        input_tag.id = "bst_input";
        removeAllChildNodes(tree_algo);
        tree_algo.appendChild(palgo);
        tree_algo.appendChild(algo_input)
        tree_algo.appendChild(input_tag)
        did("run").setAttribute("onclick","talgo('bst_find')")
    }
    else if(dt=="bt"){
        did("algo_title").innerHTML = "Binary Tree"
        let root = create_addNodes("root","root");
        insert_div.appendChild(p);
        insert_div.appendChild(root)
        let select = algo_input.cloneNode(true);
        removeAllChildNodes(select);
        let pret = document.createElement("option");
        pret.value = "pre";
        pret.innerHTML = "Pre-Order Traversal"
        let int = document.createElement("option");
        int.value = "in";
        int.innerHTML = "In-Order Traversal";
        let post = document.createElement("option");
        post.value = "post";
        post.innerHTML = "Post-Order Traversal"
        let levt = document.createElement("option");
        levt.value = "level";
        levt.innerHTML = "Level-Order Traversal";
        select.appendChild(pret);
        select.appendChild(int);
        select.appendChild(post);
        select.appendChild(levt);
        removeAllChildNodes(tree_algo);
        tree_algo.appendChild(palgo);
        tree_algo.appendChild(select);
        did("run").setAttribute("onclick","talgo('pre')")
    }
}
///End of Functions to draw a tree///


///User Interface to create a tree///

function select_node(id){
    if(did(id).classList.contains("node_clicked")){
        did(id).classList.remove("node_clicked");
        selected_node ="";
    }
    else{
        did(id).classList.add("node_clicked")
        if(did(selected_node)!=undefined&&selected_node!=""&&selected_node!=id){
            did(selected_node).classList.remove("node_clicked")
        }
        selected_node = id;
    }
}
function create_addNodes(id,side){
    let add = document.createElement('div')
    add.id = "add_"+id
    let input = document.createElement('input');
    input.id = "input_"+id;
    input.setAttribute("type","text");
    let button = document.createElement("button")
    button.setAttribute("onclick","add_node('"+side+"')");
    button.className = "button";
    button.innerHTML = "ADD "+id.toUpperCase();
    add.appendChild(input);
    add.appendChild(button);

    return add;
}

function add_root(){
    let value = did("input_root").value;;
    if(value==""){
        alert("Please input a value");
    }
    tree[1]=value;
    remove_tree();
    draw_tree();

    let tree_val = did("tree_values");
    removeAllChildNodes(tree_val)
    let p = document.createElement("p");
    p.innerHTML = "Add Nodes:"
    let add_left = create_addNodes("left","left");
    let add_right = create_addNodes("right","left");
    tree_val.appendChild(p);
    tree_val.appendChild(add_left);
    tree_val.appendChild(add_right);
    select_node("n_1")


}

function resize_tree(){
    let new_tree = Array(len*2).fill(null);
    new_tree[0]=-1;
    for(let i =1;i<(len);i++){
        new_tree[i] = tree[i];
    }
    tree = new_tree
}

function add_node(position){
    ///tag_value is the tag holding the value, position is which side to add node to//
    if(position=="bst"){
        insert_bst(did("input_node").value);
        remove_tree();
        draw_tree()
        return
    }
    if(position=="avl"){
        insert_bst(did("input_node").value);
        remove_tree();
        draw_tree()
    }
    if(position=="root"){
        add_root();
        return
    }
    let value = did("input_"+position).value;
    if(selected_node==""){
        alert("Please select a Node:");
        return
    }
    if(value == ""){
        alert("Please input a value:");
        return;
    }
    did("input_"+position).value = ""
    let len = tree.length;
    let currentNode = parseInt(selected_node.split("_")[1]);
    let nextNode;
    if(position=="left"){
        nextNode = currentNode*2 
    }
    else{
        nextNode = currentNode*2 +1;
    }
    if(tree[nextNode]!=null){
        alert("Node alredy exists to the "+position+" of the selected node.")
        return
    }

    if(nextNode>=len){
        let new_tree = Array(len*2).fill(null);
        if(tree_height(new_tree.length)>6){
            alert("Max Tree Height Reached");
            return
        }
        new_tree[0]=-1;
        for(let i =1;i<(len);i++){
            new_tree[i] = tree[i];
        }
        tree = new_tree
    }

    tree[nextNode] = value;
    remove_tree();
    draw_tree();
    draw_edge();
    select_node("n_"+nextNode)

}

function delete_node(node){
    let position = parseInt(node.id.split("_")[1]);
    if(tree.length>position*2+1){
        if(tree[position*2]!=null){
            alert("Cannot delete due to existing value to the left of the node:");
            return
        }
        if(tree[position*2+1]!=null){
            alert("Cannot delete due to existing value to the right of the node:")
            return
        }
    }

    tree[position]=null;
    node.removeAttribute("id");
    node.className="blank_node"
    removeAllChildNodes(node)
    if(position==1){
        let p = document.createElement("p");
        p.innerHTML = "Add Nodes:";
        let root = create_addNodes("root","root");
        let tree_val = did("tree_values");
        removeAllChildNodes(tree_val);
        tree_val.appendChild(p);
        tree_val.appendChild(root)
    }
    else{
        select_node("n_"+Math.floor(position/2))
        let edge = did(Math.floor((position)/2)+"_"+position);
        (edge.parentElement).removeChild(edge);
    }
    
    
}

function buildtree(input){
    let values = input.value.split(" ");
    let clean_val = [];
    for(let i=0;i<values.length;i++){
        if(values[i]!=""){
            clean_val.push(values[i])
        }
    }
    values = clean_val;
    if(did("choose_tree").value=="bst"){
        tree=[];
        for(let i=0;i<values.length;i++){
            insert_bst(values[i]);
        }
        remove_tree();
        draw_tree();
        return
    }
    if(did("choose_tree").value=="avl"){
        tree=[];
        for(let i=0;i<values.length;i++){
            let array =[[],[]];
            insert_bst(values[i]);
            array = get_balance_heights(array,1);
            for(let i = tree.length-1;i>0;i--){
                if(array[0][i]==2||array[0][i]==-2){
                    rebalance_tree(array[0],i);
                    break;
                }
            }
        }
        remove_tree();
        draw_tree();
        draw_heights();
        return
    }
    if(values.length==1 && did("input_root")!=undefined){
        did("input_root").value=values[0];
        remove_tree();
        add_root()
        select_node("n_1")
        return;
    }
    if(values.length==0){
        delete_node(did("n_1"))

    }
    let ln = tree.length
    while((ln-1)<values.length){
        ln = ln*2;
    }
    let new_tree = Array(ln).fill(null);
    if(tree_height(ln)>7){
        ln=ln/2;
        new_tree = Array(ln).fill(0);
        for(let i=0;i<ln;i++){
            new_tree[i] = values[i];
        }
        input.value = new_tree.join(" ");
        alert("Max Tree Height Reached");
        return
    }
    new_tree[0]=-1;
    for(let i=0;i<ln-1;i++){
        new_tree[i+1] = values[i];
    };
    
    tree= new_tree;
    remove_tree()
    draw_tree();
    return
}
////End of User Interface to create a tree///

////Animation Function///

function animate_tree(position,animations){
    if(position==animation_array.length-1){
        return;
    }

    /*
    * activate a node: a-id example a-n_1 <- animates node with if 1, also works with edges a-1_2 <- Edge between node 1 and 2.
    * de-activate a node: d-id example d-n_1
    * move a node to new location: m-oldloc_newloc example m-1_2, moves root to position 2.
    * blank node: b-id,b-n_1< blanks roo, prepares it for a new insert. 
    * Swap a node: s-loc1-loc2<- Swap two node locations
    * 
    */
   let animation = animations[position].split("-")[0];
   let id = animations[position].split("-")[1]
   switch (animation) {
       case "v":
           did(id).classList.add("node_visit");
           break;
        case "pa":
            did(id).classList.add("node_active");
            did("statement").innerHTML=did("statement").innerHTML+" "+tree[parseInt(id.split("_")[1])];

            break;
        case "d":
            did(id).classList.remove("node_active");
            break;
        case "dv":
            did(id).classList.remove("node_visit")
            break;
        case "m":
            break;
        case "b":
            break;
        case "s":
            break;
   }
   setTimeout(function(){
    animate_tree(position+1,animations);
   },speed)

   return;

}

function run_tree(algo){
    if(selected_node==""){
        alert("Please select a node");
    }
    let node = did(selected_node);
    if(algo=="lr"){
        left_rotate(node)
    }
}

///Binary Tree Functions///
function left_rotate(node){
    let loc = parseInt((node.id).split("_")[1]);
    let parent = get_parent(loc)
    if(parent==0){
        alert("Rotation invalid on root node");
        return;
    }

     if(loc==parent*2){
         alert("Cannot conduct left rotation on current node")
         return
     }

     let rchild = get_right_child(loc);
     let lchild = get_left_child(loc);
     if(rchild==null){
         
     }
}

function tree_algo(choose_tag){
    did("run").setAttribute("onclick","talgo('"+choose_tag.value+"')")
}

function talgo(traversal){
    did("statement").innerHTML = ""
    if(traversal=="pre"){
        pre_order_traversal(1);
    }
    else if(traversal=="in"){
        in_order_traversal(1);
    }
    else if(traversal=="post"){
        post_order_traversal(1);
    }
    else if(traversal=="level"){
        level_order_traversal(1);
    }
    else if(traversal=="bst_find"){
        bst_find();
    }
    else if(traversal=="bst_del"){
        bst_del();
    }

    did("input_tree").value = concat_tree();
    animate_tree(0,animation_array);
    animation_array = [];

}
    /*
    * activate a node: a-id example a-n_1 <- animates node with if 1, also works with edges a-1_2 <- Edge between node 1 and 2.
    * de-activate a node: d-id example d-n_1
    * move a node to new location: m-oldloc_newloc example m-1_2, moves root to position 2.
    * blank node: b-id,b-n_1< blanks roo, prepares it for a new insert. 
    * Swap a node: s-loc1-loc2<- Swap two node locations
    * 
    */
function pre_order_traversal(loc){
    if(tree[loc]==null||tree[loc]==undefined){
        return;
    }
    if(loc!=1){
        animation_array.push("d-n_"+get_parent(loc));
    }
    animation_array.push("pa-n_"+loc);
    animation_array.push("v-n_"+loc);
    pre_order_traversal(get_left_child(loc));
    pre_order_traversal(get_right_child(loc));
    animation_array.push("d-n_"+loc);
    animation_array.push("dv-n_"+loc);
    return;
}

function in_order_traversal(loc){
    if(tree[loc]==null||tree[loc]==undefined){
        return;
    }
    if(loc!=1){
        animation_array.push("d-n_"+get_parent(loc));
    }
    animation_array.push("v-n_"+loc);
    in_order_traversal(get_left_child(loc));
    animation_array.push("pa-n_"+loc);
    in_order_traversal(get_right_child(loc));
    animation_array.push("d-n_"+loc);
    animation_array.push("dv-n_"+loc);
    return;
}

function post_order_traversal(loc){
    if(tree[loc]==null||tree[loc]==undefined){
        return;
    }
    if(loc!=1){
        animation_array.push("d-n_"+get_parent(loc));
    }
    animation_array.push("v-n_"+loc);
    post_order_traversal(get_left_child(loc));
    post_order_traversal(get_right_child(loc));
    animation_array.push("pa-n_"+loc);
    animation_array.push("d-n_"+loc);
    animation_array.push("dv-n_"+loc);
    return;
}

function level_order_traversal(loc){
    let qu=[];
    let curr;
    let n;
    qu.push(loc);
    while(qu.length>0){
        curr = qu.shift();
        animation_array.push("pa-n_"+curr);
        n = get_left_child(curr);
        if(tree[n]!=null && n!=undefined){
            qu.push(n);
        }
        n = get_right_child(curr);
        if(tree[n]!=null&&n!=undefined){
            qu.push(n)
        }
        animation_array.push("d-n_"+curr);
    }

}


/////////////////////////////////////////////////////
/*Binary Search Tree Functions*/
//////////////////////////////////////////////////
function getint(string){
    let val;
    if(isNaN(parseFloat(string))){
        val = string.charCodeAt(0)
    }
    else{
        val = parseFloat(string)
    }
    return val;
}
function insert_bst(input){
    let val = getint(input);

    if(tree[1]==null||tree[1]==undefined){
        tree[1]=input;
        return
    }
    let curr=1;
    while(val<getint(tree[curr])||val>getint(tree[curr])){
        let left = get_left_child(curr);
        let right = get_right_child(curr);
        if(left>tree.length||right>tree.length){
            let new_tree = Array(tree.length*2).fill(null);
            for(let i =0;i<tree.length;i++){
                new_tree[i]=tree[i];
            }
            tree = new_tree;
        }
        if(val<getint(tree[curr])){
            if(tree[left]!=null||tree[left]!=undefined){
                curr= left
            }
            else{
                tree[left]=input;
                break;
            }
        }
        else{
            if(tree[right]!=null||tree[right]!=undefined){
                curr= right
            }
            else{
                tree[right]=input;
                break;
            }
        }
    }
}

function bst_find(){
    let val = did("bst_input").value;
    let intval = getint(val);
    let curr = 1;
    let curr_val = getint(tree[curr]);
    while(curr_val!=intval&&(intval<curr_val||intval>curr_val)){
        if(intval<curr_val){
            curr = get_left_child(curr);
        }
        else{
            curr = get_right_child(curr);
        }
        curr_val = getint(tree[curr]);
    }
    if(curr_val==intval){
        did("n_"+curr).classList.add("node_clicked");
        return curr;
    }
    return 0;
}

function parseAllChildsUp(deleted_loc){
    ///Moves all children up for a deleted node///
    let parent = get_parent(deleted_loc);
    ///If left is tree is deleted
    let curr = deleted_loc;
    if(child_defined("l",curr)){
        while(child_defined("l",curr)){
            tree[curr] = tree[get_left_child(curr)];
            curr = get_left_child(curr);
            tree[curr] = null;
        }
    }
    else if(child_defined("r",curr)){
        while(child_defined("r",curr)){
            tree[curr] = tree[get_right_child(curr)];
            curr = get_right_child(curr);
            tree[curr] = null;
        }
    }

}
function bst_del(){
    let curr = bst_find();
    if(curr==0){
        return;
    }
    ///Delete Left///
    if(getint(tree[curr])<getint(tree[1])){
        if(tree[get_left_child(curr)]==null||tree[get_left_child(curr)]==undefined){
            ncurr = get_right_child(curr);
            while(tree[get_left_child(ncurr)]!=null&&tree[get_left_child(ncurr)]!=undefined){
                ncurr = get_left_child(ncurr);
            }
        }
        else{
            ncurr = get_left_child(curr);
            while(tree[get_right_child(ncurr)]!=null&&tree[get_right_child(ncurr)]!=undefined){
                ncurr = get_right_child(ncurr);
            }
        }
        temp = tree[ncurr];
        tree[ncurr] = tree[curr];
        tree[curr] = temp;
        tree[ncurr] = null;
        parseAllChildsUp(ncurr);
    }
        ///Delete Right///
        if(getint(tree[curr])>=getint(tree[1])){
            if(tree[get_right_child(curr)]==null||tree[get_right_child(curr)]==undefined){
                ncurr = get_left_child(curr);
                while(tree[get_right_child(ncurr)]!=null&&tree[get_right_child(ncurr)]!=undefined){
                    ncurr = get_right_child(ncurr);
                }
            }
            else{
                ncurr = get_right_child(curr);
                while(tree[get_left_child(ncurr)]!=null&&tree[get_left_child(ncurr)]!=undefined){
                    ncurr = get_left_child(ncurr);
                }
            }
            temp = tree[ncurr];
            tree[ncurr] = tree[curr];
            tree[curr] = temp;
            tree[ncurr] = null;
            parseAllChildsUp(ncurr);
        }
        remove_tree();
        draw_tree();
}



///////////////////////////////////////////////////////////////////////////
/* AVL Trees */
///////////////////////////////////////////////////////////////////////
function left_roation(curr){
    let left = get_left_child(curr);
    let right = get_right_child(curr);
    let right2 = get_right_child(right);
    let children = [];
    let temp = curr;
    while(child_defined("l",temp)){
        children = get_all_children(get_left_child(temp),children);
        if(child_defined("r",temp)){
            temp = get_right_child(temp);
        }
        else{
            break;
        }
    }
    tree[left] = tree[curr];
    tree[curr] = tree[right];
    tree[right] = tree[right2];
    tree[right2] = null;
    parseAllChildsUp(right2)
    children.forEach(child=>{
        insert_bst(child)
    })
}
function right_roation(curr){
    let left = get_left_child(curr);
    let right = get_right_child(curr);
    let left2 = get_left_child(left);
    let children = [];
    let temp = curr;
    while(child_defined("r",temp)){
        children = get_all_children(get_right_child(temp),children);
        if(child_defined("l",temp)){
            temp = get_left_child(temp);
        }
        else{
            break;
        }
    }
    tree[right] = tree[curr];
    tree[curr] = tree[left];
    tree[left] = tree[left2];
    tree[left2] = null;
    parseAllChildsUp(left2)
    children.forEach(child=>{
        insert_bst(child)
    })
}

function right_left_rotation(curr){
    console.log("Right Left Rotation")
    let right = get_right_child(curr);
    let right_left = get_left_child(right);
    let right2 = get_right_child(right);
    if(right2>(tree.length-1)){
        resize_tree();
    }
    tree[right2]=tree[right];
    tree[right] = tree[right_left];
    tree[right_left]=null;
    left_roation(curr);
}

function left_right_rotation(curr){
    let left = get_left_child(curr);
    let left_right = get_right_child(left);
    let left2 = get_left_child(left);
    if(left2>(tree.length-1)){
        resize_tree();
    }
    tree[left2]=tree[left];
    tree[left] = tree[left_right];
    tree[left_right]=null;
    right_roation(curr);
}

function rebalance_tree(b_array,curr){
    console.log(tree[curr])
    //Left Rotation//
    if(b_array[curr]>=2&&b_array[get_right_child(curr)]==1){
        left_roation(curr);
    }
    //Right Rotation//
    else if(b_array[curr]<=-2&&b_array[get_left_child(curr)]==-1){
        right_roation(curr);
    }
    //Right Left Rotation//
    else if(b_array[curr]>=2&&b_array[get_right_child(curr)]==-1){
        right_left_rotation(curr);
    }
    //Left Right Rotation
    else if(b_array[curr]<=-2&&b_array[get_left_child(curr)]==1){
        left_right_rotation(curr);
    }
}

function get_balance_heights(bh_array,curr){
    ///Takes in an empty array of size tree and the current location in int///
    if(child_defined("l",curr)){
        bh_array = get_balance_heights(bh_array,get_left_child(curr))
    }
    if(child_defined("r",curr)){
        bh_array = get_balance_heights(bh_array,get_right_child(curr));
    }
    let b_array=bh_array[0];
    let h_array=bh_array[1];
    if(child_defined("l",curr)&&child_defined("r",curr)){
        h_array[curr] = Math.max(h_array[get_right_child(curr)],h_array[get_left_child(curr)])+1;
        b_array[curr] = h_array[get_right_child(curr)] - h_array[get_left_child(curr)];
    }
    else if(child_defined("l",curr)){
        h_array[curr] = h_array[get_left_child(curr)]+1;
        b_array[curr] = - h_array[get_left_child(curr)];
    }
    else if(child_defined("r",curr)){
        h_array[curr] = h_array[get_right_child(curr)]+1;
        b_array[curr] = h_array[get_right_child(curr)];
    }
    else{
        h_array[curr] = 1;
        b_array[curr] = 0;
    }
    return bh_array;

}

function draw_heights(){
    let bdiv = document.createElement("p");
    bdiv.className="avl_balance";
    let balance = Array(tree.length).fill(null);
    let heights = Array(tree.length).fill(null);
    let arrays = [balance,heights]
    arrays = get_balance_heights(arrays,1);
    balance = arrays[0];
    heights = arrays[1];
    let node_size = parseInt(document.getElementsByClassName('tree_node')[0].offsetWidth)/2;
    let balance_div = did("balance");
    for(let i=0;i<balance.length;i++){
        if(balance[i]!=null){
            let clone = bdiv.cloneNode(true);
            clone.innerHTML = balance[i];
            clone.id = "b_"+i;
            let offset = get_offset(did("n_"+i));
            if(getint(tree[i])>=getint(tree[1])){
                clone.setAttribute("style","right:"+(-offset.right-node_size/2)+"px; top:"+(offset.top-node_size/2)+"px");
            }
            else{
                clone.setAttribute("style","left:"+(offset.left-node_size/2)+"px; top:"+(offset.top-node_size/2)+"px");
            }
            balance_div.appendChild(clone);
        }
    }
}
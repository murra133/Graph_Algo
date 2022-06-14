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
    animation_array.push("del-n_"+loc);
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
    console.log(tree)
    let string = "";
    for(let i =1;i<tree.length;i++){
        if(tree[i]!=null||tree[i]!=undefined){
            string = string+tree[i]+" "
        }
    }
    did("input_tree").value = string;
}

function tree_height(tree_length){
    return Math.floor(Math.log2(tree_length))
}

function write_tree(value){
    if(value=="");
}
function draw_tree(){
    let tree_port = did("tree"); 
    let node_space = 10;

    tree_port.setAttribute("style","row-gap:"+node_space+"px")
    //Node Sample//
    let node = document.createElement('div');
    node.setAttribute("class","tree_node node_clickable");
    node.setAttribute("ondblclick","delete_node(this)");
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
    console.log(tree)
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
        if(child_defined("l",i)){
            draw_single_edge("n_"+i,"n_"+(get_left_child(i)));
            }
            //draw_right//
            if(child_defined("r",i)){
                draw_single_edge("n_"+i,"n_"+(get_right_child(i)));
            }
        }
    }


function draw_single_edge(id1,id2){
///id1 is always the parent of id2///
    let loc1 = id1.split("_")[1];
    let loc2 = id2.split("_")[1]
    let node_size = did(id1).offsetWidth/2;
    let offset1 = get_offset(did(id1));
    let offset2 = get_offset(did(id2));
    //Create Edge//
    let edge_port = did('edges');
    let edge = document.createElement("div")
    edge.setAttribute("class","tree_edge");
    edge.id = "e_"+loc1+"_"+loc2;

    offset1.top = offset1.top +node_size
    offset1.left = offset1.left +node_size
    offset2.top = offset2.top +node_size
    offset2.left = offset2.left +node_size

    let width = dist(offset1.left,offset2.left,offset1.top,offset2.top);
    let rotation = edge_rotation(offset1.top,offset1.left,offset2.top,offset2.left)
    let pos_top = offset1.top+(offset2.top-offset1.top)/2;
    let pos_left;
    if(get_left_child(loc1)==loc2){
        pos_left = offset2.left+(offset1.left-offset2.left)/2-width/2
    }
    else{
        pos_left = offset1.left+(offset2.left-offset1.left)/2-width/2
    }
    edge.setAttribute("style","width:"+width+"px; top:"+pos_top+"px; left:"+pos_left+"px;transform: rotateZ("+get_degree(rotation)+"deg)");
    edge_port.appendChild(edge);
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

        let insert_node = create_addNodes("node",dt);
        insert_div.appendChild(p);
        insert_div.appendChild(insert_node);
        removeAllChildNodes(algo_input);
        let select_find = document.createElement("option");
        select_find.value = "bst_find";
        select_find.innerHTML = "Find"
        let select_delete = document.createElement("option");
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
        if(dt=="avl"){
            did("algo_title").innerHTML = "AVL Tree"
            select_delete.value = "avl_del";

        }
        else{
            did("algo_title").innerHTML = "Binary Search Tree"
            select_delete.value = "bst_del";
        }
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
    else if(dt == "hp"){
        let insert_node = create_addNodes("node",dt);
        insert_div.appendChild(p);
        insert_div.appendChild(insert_node);
        removeAllChildNodes(algo_input);
        let select_find = document.createElement("option");
        select_find.value = "hp_min";
        select_find.innerHTML = "Remove Min"
        algo_input.appendChild(select_find);
        removeAllChildNodes(tree_algo);
        tree_algo.appendChild(palgo);
        tree_algo.appendChild(algo_input)
        did("run").setAttribute("onclick","talgo('hp_min')")
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
    let add_right = create_addNodes("right","right");
    tree_val.appendChild(p);
    tree_val.appendChild(add_left);
    tree_val.appendChild(add_right);
    select_node("n_1")


}

function resize_tree(){
    let len = tree.length;
    let new_tree = Array(len*2).fill(null);
    let tree_level = document.createElement("div");
    tree_level.className = "tree_levels";
    let node = document.createElement("div");
    node.className = "blank_node";
    node.setAttribute("ondblclick","delete_node(this)");
    new_tree[0]=-1;
    for(let i =1;i<(len);i++){
        new_tree[i] = tree[i];
    }
    if(did("tree").children.length==0){
        let tree_level_copy = tree_level.cloneNode(true);
        tree_level.id = "l_0";
        let node_copy = node.cloneNode(true);
        node_copy.id = "n_1";
        node_copy.className = "tree_node node_clickable"
        tree_level_copy.appendChild(node_copy);
        did("tree").appendChild(tree_level_copy);
        }
    if(did("tree").children.length!=tree_height(new_tree.length)){
        let tree_level_copy = tree_level.cloneNode(true);
        tree_level_copy.id = "l_"+tree_height(new_tree.length);
        for(let i = new_tree.length/2;i<new_tree.length;i++){
            console.log(i)
            let node_copy = node.cloneNode(true);
            node_copy.id = "n_"+i;
            tree_level_copy.appendChild(node_copy);
        }
        did("tree").appendChild(tree_level_copy);
    }
    tree = new_tree
    if(child_defined("l",1)||child_defined("r",1)){
        removeAllChildNodes(did("edges"));
        draw_edge();
    }
    if(did("balance").children.length!=0){
        removeAllChildNodes(did("balance"));
        draw_heights();
    }
    console.log(tree)

}

function add_node(position){
    ///tag_value is the tag holding the value, position is which side to add node to//
    let nodes = qsa(".tree_node");
    nodes.forEach(node=>{
        node.classList.remove("node_visit");
        node.classList.remove("node_active");
    })
    if(position=="bst"||position=="avl"){
        insert_bst(did("input_node").value,position);
        animation_array.push("dh-n_0");
        animate_tree(0,animation_array)
        animation_array=[];
        did("input_node").value = "";
        concat_tree();
        return
    }
    if(position=="root"){
        add_root();
        return
    }
    if(position=="hp"){
        hp_insert(did("input_node").value);
        animate_tree(0,animation_array);
        animation_array=[];
        did("input_node").value = "";
        concat_tree();
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
    let dt = did("choose_tree").value;
    for(let i=0;i<values.length;i++){
        if(values[i]!=""){
            clean_val.push(values[i])
        }
    }
    values = clean_val;
    if(dt=="bst"||dt=="avl"){
        tree=[];
        for(let i=0;i<values.length;i++){
            insert_bst(values[i],dt);
        }
        remove_tree();
        draw_tree();
        draw_heights();
        animation_array = [];
        return
    }
    if(dt == "hp"){
        tree=[-1,null];
        for(let i=0;i<values.length;i++){
            hp_insert(values[i]);
        }
        remove_tree();
        draw_tree();
        draw_edge();
        animation_array = [];
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
    animation_array=[];
    return
}
////End of User Interface to create a tree///

////Animation Function///

function animate_tree(position,animations){
    if(position==animations.length){
        return;
    }
    console.log(animations[position])
    /*
    * activate a node: a-id example a-n_1 <- animates node with if 1, also works with edges a-1_2 <- Edge between node 1 and 2.
    * de-activate a node: d-id example d-n_1
    * move a node to new location: m-oldloc_newloc example m-1_2, moves root to position 2.
    * blank node: b-id,b-n_1< blanks roo, prepares it for a new insert. 
    * Swap a node: s-id1-id2<- Swap two node locations, id1 is always the parent
    * pn,pf (Print statements); pn-Statement
    * delete Node and Edges: del-id <- Deletes node and parent node edge.
    * delete edge only: dele-edgeid < Deletes edge only
    * draw an new edge: de-id1-id2 <- id1 is always the parent
    */
   let animation = animations[position].split("-")[0];
   let id = animations[position].split("-")[1]
   let id2 = animations[position].split("-")[2];
   let loc = parseInt(id.split("_")[1]) ;
   switch (animation) {
       case "v":
           did(id).classList.add("node_visit");
           break;
        case "a":
            did(id).classList.add("node_active");
            break;
        case "ta":
            did(id).classList.add("node_active");
            did("statement").innerHTML=did("statement").innerHTML+" "+tree[parseInt(id.split("_")[1])];
            break;
        case "d":
            did(id).classList.remove("node_active");
            break;
        case "dv":
            did(id).classList.remove("node_visit");
            did(id).classList.remove("node_active");
            break;
        case "pf":
            did("statement").innerHTML= id;
            break;
        case "s":
            var loc_2 = loc;
            loc = id2.split("-");
            let temp1 = did(id2).cloneNode(true);
            let temp2 = did(id).cloneNode(true);
            temp1.id = "n_temp";
            temp1.setAttribute("onclick","select_nodes'"+id+"'")
            temp2.id = id2;
            temp1.setAttribute("onclick","select_nodes'"+id2+"'")
            did(id2).replaceWith(temp2);
            did(id).replaceWith(temp1);
            did("n_temp").id = id;
            if(loc<loc_2&&temp2.classList.contains("blank_node")){
                did("e_"+loc+"_"+loc_2).remove();
            }
            else if(loc_2<loc&&temp1.classList.contains("blank_node")){
                did("e_"+loc_2+"_"+loc).remove();
            }
            break;
        case "add":{

            if(did(id)==undefined){
                resize_tree();
            }
            let node = did(id);
            node.className="tree_node node_clickable";
            node.innerHTML = id2;
            if(loc!=1){
                draw_single_edge("n_"+get_parent(loc),id);
            }
            break;
        }
        case "del":
            let edge = did("e_"+get_parent(loc)+"_"+loc);
            if(edge!=undefined){
                edge.remove();
            }
            did(id).className ="blank_node";
            removeAllChildNodes(did(id))
            if(did("b_"+loc)!=undefined){
                did("b_"+loc).remove();
            }
            if(did("bst_input")!=undefined){
                did("statement").innerHTML= did("bst_input").value+" Was Deleted";
            }
            else if(did("input_node")!=undefined){
                did("statement").innerHTML= did("input_node").value+" Was Deleted";
            }
            break;
        case "deln":
            did(id).className = "blank_node";
            removeAllChildNodes(did(id))
            break;
        case "dele":
            let loc2 = get_parent(loc) ;
            let edged = did("e_"+loc2+"_"+loc);
            if(edged!=undefined){
                edged.remove();
            }
            break;
        case "de":
            draw_single_edge(id,id2);
            break;
        case "b":
            if(animations[position].split("-").length>3){
                if(did(id)==undefined){
                    draw_hb_node(id,id2+"-"+animations[position].split("-")[3]);
                }
                else{
                    did(id).innerHTML = id2+"-"+animations[position].split("-")[3];
                }
            }
            else{
                if(did(id)==undefined){
                    draw_hb_node(id,id2);
                }
                else{
                    did(id).innerHTML = id2;
                }
            }
            break;
        case "dh":
            removeAllChildNodes(did("balance"));
            draw_heights();
            removeAllChildNodes(did("edges"));
            draw_edge();
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
    let nodes = qsa(".tree_node");
    nodes.forEach(node=>{
        node.classList.remove("node_visit");
        node.classList.remove("node_active");
    })
    if(did('settings').classList.contains("active")){
        toggle_sidebar(did("settings"))
    }
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
        bst_del("bst");
    }
    else if(traversal == "avl_del"){
        bst_del("avl");
    }
    else if(traversal == "hp_min"){
        hp_remove_min();
    }

    concat_tree();
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
    animation_array.push("ta-n_"+loc);
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
    animation_array.push("ta-n_"+loc);
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
    animation_array.push("ta-n_"+loc);
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
        animation_array.push("ta-n_"+curr);
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
function insert_bst(input,dt){
    let val = getint(input);
    if(tree[1]==null||tree[1]==undefined){
        tree[1]=input;
        animation_array.push("add-n_1-"+input);
        return
    }
    let curr=1;
    while(val<getint(tree[curr])||val>getint(tree[curr])){
        animation_array.push("d-n_"+curr);
        let left = get_left_child(curr);
        let right = get_right_child(curr);
        if(left>tree.length||right>tree.length){
            resize_tree();
        }
        if(val<getint(tree[curr])){
            if(tree[left]!=null||tree[left]!=undefined){
                curr= left
                animation_array.push("a-n_"+curr);
                animation_array.push("v-n_"+curr);
            }
            else{
                tree[left]=input;
                animation_array.push("d-n_"+curr);
                animation_array.push("add-n_"+left+"-"+input);
                let array = get_balance_heights([[],[]],1);
                curr=left;
                while(curr>0){
                    animation_array.push("a-n_"+curr)
                    animation_array.push("b-b_"+curr+"-H:"+array[1][curr]+" B:"+array[0][curr])
                    animation_array.push("dv-n_"+curr)
                    if(dt =="avl"){
                        if(array[0][curr]>1||array[0][curr]<(-1)){
                            console.log("rebalance")
                            rebalance_tree(array[0],curr);
                            break;
                        }
                    }
                    curr = get_parent(curr);
                }
                break;
            }
        }
        else{
            if(tree[right]!=null||tree[right]!=undefined){
                curr= right
                animation_array.push("a-n_"+curr);
                animation_array.push("v-n_"+curr);
            }
            else{
                tree[right]=input;
                animation_array.push("d-n_"+curr);
                animation_array.push("add-n_"+right+"-"+input);
                let array = get_balance_heights([[],[]],1);
                curr=right;
                while(curr>0){
                    animation_array.push("a-n_"+curr)
                    animation_array.push("b-b_"+curr+"-H:"+array[1][curr]+" B:"+array[0][curr]);
                    animation_array.push("dv-n_"+curr)
                    if(dt =="avl"){
                        if(array[0][curr]>1||array[0][curr]<(-1)){
                            console.log("rebalance")
                            rebalance_tree(array[0],curr);
                            break
                        }
                    }
                    curr = get_parent(curr);
                }
                break;
            }
        }
    }
    return curr;
}

function insert_avl(){
    let curr = insert_bst()
}

function bst_find(){
    let val = did("bst_input").value;
    let intval = getint(val);
    let curr = 1;
    animation_array.push("a-n_"+curr)
    animation_array.push("v-n_"+curr)
    let curr_val = getint(tree[curr]);
    let next;
    while(curr_val!=intval&&(intval<curr_val||intval>curr_val)){
        animation_array.push("d-n_"+curr)
        if(intval<curr_val){
            next = get_left_child(curr)
        }
        else{
            next = get_right_child(curr)
        }
        // animation_array.push("a-"+curr+"_"+next)
        // animation_array.push("v-"+curr+"_"+next)
        // animation_array.push("d-"+curr+"_"+next)
        curr = next;
        if(tree[curr]==null||tree[curr]==undefined){
            break;
        }
        else{
            animation_array.push("a-n_"+curr)
            animation_array.push("v-n_"+curr)
        }
        curr_val = getint(tree[curr]);

    }
    if(curr_val==intval){
        animation_array.push("pf-"+val+" Was Found");
        return curr;
    }
    else{
        animation_array.push("d-n_"+get_parent(curr))
        animation_array.push("pf-"+val+" Was Not Found");

    }
    return 0;
}

function parseAllChildsUp(deleted_loc){
    ///Moves all children up for a deleted node///
    let parent = get_parent(deleted_loc);
    ///If left is tree is deleted
    let curr = deleted_loc;
    // if(!child_defined("l",curr)&&child_defined("r",curr)){
    //     tree[curr] = null;
    //     animation_array.push("del-n_"+curr)
    // }
        ///Run Left///
        if(child_defined("r",get_left_child(curr))){
                curr = get_left_child(curr);
                if(!child_defined("r",curr)){
                    tree[deleted_loc] = tree[curr];
                    animation_array.push("s-n_"+deleted_loc+"-n_"+curr);
                    parseAllChildsUp(curr);
                }
                while (child_defined("r",curr)){
                    curr = get_right_child(curr)
                    if(!child_defined("r",curr)){
                        tree[deleted_loc] = tree[curr];
                        animation_array.push("s-n_"+deleted_loc+"-n_"+curr);
                        tree[curr] = null;
                        animation_array.push("del-n_"+curr)
                    }
                }
            
        }
        //Run Right//
        else if(child_defined("l",get_right_child(curr))){
                curr = get_right_child(curr);
                if(!child_defined("l",curr)){
                    tree[deleted_loc] = tree[curr];
                    animation_array.push("s-n_"+deleted_loc+"-n_"+curr);
                    parseAllChildsUp(curr);
                }
                while (child_defined("l",curr)){
                    curr = get_left_child(curr)
                    if(!child_defined("l",curr)){
                        tree[deleted_loc] = tree[curr];
                        animation_array.push("s-n_"+deleted_loc+"-n_"+curr);
                        tree[curr] = null;
                        animation_array.push("del-n_"+curr)
                    }
                }
            }
        else if(child_defined("l",curr)){
                curr = get_left_child(curr);
                tree[deleted_loc] = tree[curr];
                animation_array.push("s-n_"+deleted_loc+"-n_"+curr);
                parseAllChildsUp(curr);
            }
        else if(child_defined("r",curr)){
                curr = get_right_child(curr);
                tree[deleted_loc] = tree[curr];
                animation_array.push("s-n_"+deleted_loc+"-n_"+curr);
                parseAllChildsUp(curr);
            }
        else{
                tree[curr]=null;
                animation_array.push("del-n_"+curr)
            }
        

        return curr;
}
function bst_del(dt){
    let curr = bst_find();
    if(curr==0){
        return;
    }
    let del_parent = get_parent(parseAllChildsUp(curr));
    let array = [[],[]];
    array = get_balance_heights(array,1);
    let balance = array[0];
    let heights = array[1];
    console.log(balance)
    while(del_parent>0){
        animation_array.push("a-n_"+del_parent);
        animation_array.push("b-b_"+del_parent+"-H:"+heights[del_parent]+" B:"+balance[del_parent]);
        animation_array.push("d-n_"+del_parent);
        if(dt=="avl"&&(balance[del_parent]==2||balance[del_parent]==-2)){
            rebalance_tree(balance,del_parent)
            array = get_balance_heights(array,1);
            balance = array[0];
            heights = array[1];
        }
        del_parent = get_parent(del_parent);
    }

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
    animation_array.push("s-n_"+left+"-n_"+curr);
    animation_array.push("de-n_"+curr+"-n_"+left);
    tree[curr] = tree[right];
    animation_array.push("s-n_"+curr+"-n_"+right);
    tree[right] = tree[right2];
    animation_array.push("s-n_"+right+"-n_"+right2);
    // tree[right2] = null;
    parseAllChildsUp(right2)
    children.forEach(child=>{
        insert_bst(child,"bst")
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
    animation_array.push("s-n_"+right+"-n_"+curr);
    animation_array.push("de-n_"+curr+"-n_"+right);
    tree[curr] = tree[left];
    animation_array.push("s-n_"+curr+"-n_"+left);
    tree[left] = tree[left2];
    animation_array.push("s-n_"+left+"-n_"+left2);
    // tree[left2] = null;
    parseAllChildsUp(left2)
    children.forEach(child=>{
        insert_bst(child,"bst")
    })
}

function right_left_rotation(curr){
    let right = get_right_child(curr);
    let right_left = get_left_child(right);
    let right2 = get_right_child(right);
    if(right2>(tree.length-1)){
        resize_tree();
    }
    tree[right2]=tree[right];
    animation_array.push("s-n_"+right+"-n_"+right2);
    tree[right] = tree[right_left];
    animation_array.push("s-n_"+right+"-n_"+right_left);
    // tree[right_left]=null;
    left_roation(curr);
    parseAllChildsUp(right_left)
}

function left_right_rotation(curr){
    let left = get_left_child(curr);
    let left_right = get_right_child(left);
    let left2 = get_left_child(left);
    if(left2>(tree.length-1)){
        resize_tree();
    }
    tree[left2]=tree[left];
    animation_array.push("s-n_"+left2+"-n_"+left);
    tree[left] = tree[left_right];
    animation_array.push("s-n_"+left+"-n_"+left_right);
    // tree[left_right]=null;
    right_roation(curr);
    parseAllChildsUp(left_right);
}

function rebalance_tree(b_array,curr){
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
            clone.innerHTML = "H:"+heights[i]+" B:"+balance[i];
            clone.id = "b_"+i;
            let offset = get_offset(did("n_"+i));
            if(getint(tree[i])>=getint(tree[1])){
                clone.setAttribute("style","right:"+(-offset.right-node_size*1.5)+"px; top:"+(offset.top-node_size/2)+"px");
            }
            else{
                clone.setAttribute("style","left:"+(offset.left-node_size*1.5)+"px; top:"+(offset.top-node_size/2)+"px");
            }
            balance_div.appendChild(clone);
        }
    }
}

function draw_hb_node(id,HTML){
    let loc = id.split("_")[1];
    let node_size = parseInt(document.getElementsByClassName('tree_node')[0].offsetWidth)/2;
    let balance_div = did("balance");
    let offset = get_offset(did("n_"+loc));
    let bdiv = document.createElement("p");
    bdiv.innerHTML =  HTML;
    bdiv.id = "b_"+loc;
    bdiv.className = "avl_balance"
    if(getint(did('n_'+loc).innerHTML)>=getint(did("n_1").innerHTML)){
        bdiv.setAttribute("style","right:"+(-offset.right-node_size*1.5)+"px; top:"+(offset.top-node_size/2)+"px");
    }
    else{
        bdiv.setAttribute("style","left:"+(offset.left-node_size*1.5)+"px; top:"+(offset.top-node_size/2)+"px");
    }
    balance_div.appendChild(bdiv);
}

/////////////////////////////////
function hp_insert(val){
    let loc = 0;
    for(let i=1;i<tree.length;i++){
        if(tree[i]==null){
            tree[i] = val;
            loc = i;
            animation_array.push("add-n_"+loc+"-"+val);
            break
        }
        if(i==(tree.length-1)){
            resize_tree();
        }
    }
    heapify_up(loc);
}
function hp_remove_min(){
    console.log("remove min")
    let loc =0;
    for(let i=1;i<tree.length;i++){
        if(tree[i]==null){
            loc=i-1;
            break;
        }
    }
    tree[1] = tree[loc];
    tree[loc] = null;
    animation_array.push("a-n_"+loc)
    animation_array.push("s-n_1-n_"+loc)
    animation_array.push("del-n_"+loc);
    heapify_down(1);
}
function heapify_up(curr){
    animation_array.push("v-n_"+curr);
    let parent = get_parent(curr)
    animation_array.push("a-n_"+parent)
    animation_array.push("v-n_"+parent);
    while(getint(tree[parent])>getint(tree[curr])){
        let temp = tree[curr];
        tree[curr] = tree[parent];
        tree[parent]=temp;
        animation_array.push("s-n_"+parent+"-n_"+curr);
        animation_array.push("d-n_"+curr);
        curr = parent;
        parent = get_parent(curr);
        if(parent<1){
            break;
        }
        animation_array.push("a-n_"+parent)
        animation_array.push("v-n_"+parent);
    }
    animation_array.push("d-n_"+parent);

}
function heapify_down(curr){
    if(!child_defined("l",curr)&&!child_defined("r",curr)){
        return;
    }
    animation_array.push("v-n_"+curr);
    let left;
    let right;
    let temp;
  
    while(child_defined("l",curr)&&child_defined("r",curr)){
        left = get_left_child(curr);
        right = get_right_child(curr); 
        if(getint(tree[left])>getint(tree[curr])&&getint(tree[right])>getint(tree[curr])){
            break;
        }
        animation_array.push("a-n_"+left);
        animation_array.push("a-n_"+right);
        if(getint(tree[left])<getint(tree[right])){
            if(getint(tree[curr])>getint(tree[left])){
                animation_array.push("v-n_"+left);
                animation_array.push("d-n_"+right);
                temp = tree[curr];
                tree[curr] = tree[left];
                tree[left] = temp;
                animation_array.push("s-n_"+curr+"-n_"+left);
                animation_array.push("d-n_"+curr);
                curr=left;
            }
        }
        else{
            if(getint(tree[curr])>getint(tree[right])){
                animation_array.push("v-n_"+right);
                animation_array.push("d-n_"+left);
                temp = tree[curr];
                tree[curr] = tree[right];
                tree[right] = temp;
                animation_array.push("s-n_"+curr+"-n_"+right);
                animation_array.push("d-n_"+curr);
                curr=right;
            }
        }
    }

}
/////////////////////////////////
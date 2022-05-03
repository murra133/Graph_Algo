//tree variables//
// tree=[-1,null,null,null,null,null,null,null]; //-1 the First node is not the root, the root will always be located at position 1//
tree = [-1,5,2,6,4,null,8,null,7,8,null,null,10,12,null,null]
selected_node = 0;

function add_node(tag_value,position){
    ///tag_value is the tag holding the value, position is which side to add node to//
    let val = tag_value.value;
    if(val==undefined){
        alert("Please input a value:");
        return
    }
    if(tree[1] == null){
        tree[1] = tag_value.value;
        return;
    }
}

function tree_width(height){
    if(height==0){
        return 1
    }
    let width = Array(height);
    width[0]=1;
    for(let i=1;i<height;i++){
        width[i] = width[i-1]*2;
        console.log(width)
    }
    return width[height-1];
}

function tree_height(tree_length){
    return Math.floor(Math.log2(tree_length))
}

function draw_tree(){
    let tree_port = did("tree"); 
    let height = tree_height(tree.length);
    let width = tree_width(height);
    let node_size = 50;
    let node_space = 25;

    tree_port.setAttribute("style","row-gap:"+node_space+"px")
    //Node Sample//
    let node = document.createElement('div');
    node.setAttribute("class","tree_node");
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

    let height = tree_height(tree.length);
    let t_width = tree_width(height);
    let node_size = parseInt(document.getElementsByClassName('tree_node')[0].offsetWidth)/2;
    let edge_port = did('edges');
    removeAllChildNodes(edge_port);
    let edge = document.createElement("div")
    edge.setAttribute("class","tree_edge");
    for (let i=1;i<tree.length;i++){
        if(tree[i]!=null){
            let offset1 = get_offset(did("n_"+i));
            //Draw left//
            if(tree[i*2]!=null){
                let offset2 = get_offset(did("n_"+(i*2)));
                console.log(offset2);
                console.log(offset1)
                let edge_copy = edge.cloneNode(true);
                let width = dist(offset1.left,offset2.left,offset1.top,offset2.top);
                let rotation = edge_rotation(offset1.top,offset1.left,offset2.top,offset2.left)
                let pos_top = offset1.top - (offset1.top-offset2.top)/2+node_size;
                let pos_left = offset1.left - (offset1.left-offset2.left);
                edge_copy.setAttribute("style","width:"+width+"px; top:"+pos_top+"px; left:"+pos_left+"px; transform: rotateZ("+get_degree(rotation)+"deg)");
                edge_port.appendChild(edge_copy);
            }
            //draw_right//
            if(tree[i*2+1]!=null){
                let offset2 = get_offset(did("n_"+(i*2+1)));
                console.log(offset2);
                console.log(offset1)
                let edge_copy = edge.cloneNode(true);
                let width = dist(offset1.left,offset2.left,offset1.top,offset2.top);
                let rotation = edge_rotation(offset1.top,offset1.left,offset2.top,offset2.left)
                let pos_top = offset1.top - (offset1.top-offset2.top)/2+node_size;
                let pos_left = offset2.left - (offset2.left-offset1.left);
                edge_copy.setAttribute("style","width:"+width+"px; top:"+pos_top+"px; left:"+pos_left+"px; transform: rotateZ("+get_degree(rotation)+"deg)");
                edge_port.appendChild(edge_copy);
            }
        }
    }
}
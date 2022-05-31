///Global UI///

////Global Variables////
var speed = 20;


//// Side Bar Toggle////

function toggle_sidebar(button){
    if(button.getAttribute('class')=="inactive"){
        button.setAttribute('class',"active")
        document.getElementById('sidebar').setAttribute('class',"active")
    }
    else{
        button.setAttribute('class',"inactive")
        document.getElementById('sidebar').setAttribute('class',"inactive")
    }
}

function did(id){
    /// quick way to get and element by id
    return document.getElementById(id)
}
function dcl(class_){
    return document.getElementsByClassName(class_)
}
function qsa(selector){
    return document.querySelectorAll(selector)
}

function vle(element){
    if(element.getAttribute('value')=='n'){ 
    return element.getAttribute('value')}
    else{
        return parseFloat(element.getAttribute('value'))
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
function reset(){
    let v = qsa('.visit');
    let p = qsa('.path');
    let r = qsa('.relax');

    if (did("data")!=undefined){
        removeAllChildNodes(did('data'));
        visualize_sort();
    }
    r.forEach(block=>{
        if(block.classList.contains('fa-solid')){
            block.classList.remove('relax')
        }
        else{
            block.className = 'nvisit'
        }
    })
    v.forEach(block=>{
        if(block.classList.contains('fa-solid')){
            block.classList.remove('visit')
        }
        else{
            block.className = 'nvisit'
        }
    })
    p.forEach(block=>{
        if(block.classList.contains('fa-solid')){
            block.classList.remove('path')
        }
        else{
            block.className = 'nvisit'
        }
    })

}
function speed_instant(checkbox){
    if(checkbox.checked){
        speed = 'instant';
    }
    else{
        speed=5
        speed_change(did(speed))
    }
}



function clear_(){
    // did("stat_visit").innerHTML = 0;
    // did("stat_time").innerHTML = 0;
    if(did("grid")!=null){
        removeAllChildNodes(did('grid'));
        grid_size()
        start=''
        location_=[]
    }
    else if(did('data')!=null){
        removeAllChildNodes(did('data'))
        did("sort_values").value = ""
        array_val=[];
    }
    else if(did('tree')!=null){
        removeAllChildNodes(did('tree'));
        removeAllChildNodes(did('edges'));
        let p = document.createElement("p");
        p.innerHTML = "Add Nodes:";
        let root = create_addNodes("root");
        let tree_val = did("tree_values");
        removeAllChildNodes(tree_val);
        tree_val.appendChild(p);
        tree_val.appendChild(root)
    }

}

function speed_change(bar){
    if (speed!='instant'){
        speed = bar.value;
        did('speed_val').innerHTML=bar.value+"ms"
    }

}



function heap_remove(heapv,heapid,action){
    // console.log(heapv)
    ////Set action to "graph" if this function is to be ran in a graph function
    let length_diff;
    let minv = heapv[1]
    let minid = heapid[1]
    if(action!='graph'){
        ///Remove the first
        length_diff = sort_array.length-heapv.length+1
        action.push('l_'+length_diff);
        // console.log('l_'+length_diff)
    }
    heapv[1]=heapv[heapv.length-1]
    heapid[1]=heapid[heapid.length-1]
    heapv.pop()
    heapid.pop()
    if(action!='graph'){
        length_diff = sort_array.length-heapv.length+1
        let l = length_diff
        action.push('v_'+(sort_array.length-1))
        action.push('i_'+(sort_array.length -1)+"_"+l)
        // for(let i=(sort_array.length-1);i>l;i--){
        //     action.push('s_'+i+'_'+(i-1))
        // }
    }
    loc =1;
    let c=1;


    ///Move Down////
    while(heapv[loc]>heapv[loc*2]||heapv[loc]>heapv[loc*2+1]&&c ==1){
        
        let tempv = heapv[loc];
        let tempid = heapid[loc];
        if (heapv[loc*2]==null&&heapv[loc*2+1]==null){
            c=1;
        }
        else if (heapv[loc*2]==null){
            if(action!='graph'){
                action.push('v_'+(loc*2+1))
                action.push('s_'+(loc+length_diff-1)+'_'+(loc*2+length_diff));
            }
            heapv[loc]=heapv[loc*2+1]
            heapid[loc]=heapid[loc*2+1]
            heapv[loc*2+1]=tempv
            heapid[loc*2+1]=tempid
            loc = loc*2+1  

        }
        else if(heapv[loc*2+1]==null){
            if(action!='graph'){
                action.push('v_'+(loc*2))
                action.push('s_'+(loc+length_diff-1)+'_'+(loc*2+length_diff-1));
            }
            heapv[loc]=heapv[loc*2]
            heapid[loc]=heapid[loc*2]
            heapv[loc*2]=tempv
            heapid[loc*2]=tempid
            loc = loc*2
        }
        else{
            if (heapv[loc*2]<heapv[loc*2+1]){
                if(action!='graph'){
                    action.push('v_'+(loc*2))
                    action.push('s_'+(loc+length_diff-1)+'_'+(loc*2+length_diff-1));
                }
                heapv[loc]=heapv[loc*2]
                heapid[loc]=heapid[loc*2]
                heapv[loc*2]=tempv
                heapid[loc*2]=tempid
                loc = loc*2
                
            }
            else{
                if(action!='graph'){
                    action.push('v_'+(loc*2+1))
                    action.push('s_'+(loc+length_diff-1)+'_'+(loc*2+length_diff));
                }
                heapv[loc]=heapv[loc*2+1]
                heapid[loc]=heapid[loc*2+1]
                heapv[loc*2+1]=tempv
                heapid[loc*2+1]=tempid
                loc = loc*2+1  
            }

        }
    }
    // console.log(action)
    if(action!='graph'){
        // action.push('d_'+loc);
        action.push('dv')
        return [heapv,heapid,action,minv]
    }
    return [minv,minid,heapv,heapid]
}

function heap_insert(heapv,heapid,nv,nid,action){
    heapv.push(nv)
    heapid.push(nid)
    let loc = heapv.length-1;
    let ploc = Math.floor(loc/2)
    if(action!='graph'){
        action.push('a_'+(loc-1))
    }

    ////Move Up////
    while(loc!=1&&heapv[loc]<heapv[ploc]){
        if(action!='graph'){
            ///This is for the sort animation on the sort site
            action.push('v_'+(ploc-1))
            action.push('s_'+(loc-1)+"_"+(ploc-1))
        }
        let tempv = heapv[loc];
        let tempid = heapid[loc];
        heapv[loc]= heapv[ploc]
        heapid[loc]=heapid[ploc]
        heapid[ploc]=tempid
        heapv[ploc]=tempv
        loc = ploc;
        ploc = Math.floor(loc/2)
    }
    if(action!='graph'){
        ///Returns the locations and the animation for heap sort///
        action.push('d_'+(loc-1))
        action.push('dv')
        return [heapv,heapid,action]
    }
    return [heapv,heapid]
}
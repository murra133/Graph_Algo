

animate = [];
function animate_tile(tile){
    if(tile=="graph"){
    }
    if(tile=="sort"){
        sort_array = [4,7,3,8,2,1,6];
        qsort_start();
        a_sort(animation_arr,0)
        animation_arr = [];
    }
    if(tile=="tree"){
        let array = get_balance_heights([[],[]],1);
        rebalance_tree(array[0],1);
        animate_tree(0,animation_array);
        animation_array = []
    }
}

function animate_graph(){
    animate = [[],[]];
    let algo =Math.floor(Math.random() * 2);
    if(algo == 0){
        animate = bfs("1_1","1_1","4_5",animate);
    }
    else{
        animate = dfs("1_1","4_5",animate);
    }
    animate_visit(animate,0,0)
    animate = []
}


function deanimate_tile(tile){
    if(tile=="graph"){
        let sequence = ["dg-4_4","dg-3_5","dg-3_4","dg-4_3","dg-4_4","dg-3_3","dg-2_3","dg-2_4","dg-2_5","dg-4_2","dg-3_2","dg-2_2","dg-1_2","dg-1_3","dg-1_4","dg-1_5","dg-4_1","dg-3_1","dg-2_1"];
        deanimate(sequence,0);
    }
    if(tile=="sort"){
        let sequence = ["ds-s40","ds-s70","ds-s30","ds-s80","ds-s20","ds-s10","ds-s60"]
        deanimate(sequence,0);
    }
    if(tile=="tree"){
        let r1 = Math.floor(Math.random() * 2);
        let r2 = Math.floor(Math.random() * 2);
        let p1 = get_left_child(1);
        if(r1==1){
            p1 = get_right_child(1);
        }
        let p2=get_left_child(p1);
        if(r2==1){
            p2 = get_right_child(p1)
        }

        tree = Array(8).fill(null);
        tree[0]=-1;
        tree[1] = "";
        tree[p1] = "";
        tree[p2]="";
        remove_tree();
        draw_tree();
        let bn = qsa(".blank_node");
        let tn = qsa(".tree_node")
        did("tree").setAttribute("style","width:175px;height:100px")
        bn.forEach(child=>{
            child.setAttribute("style","width:22px;height:22px");
        })
        tn.forEach(child=>{
            child.setAttribute("style","width:22px;height:22px");
        })
        draw_edge();


        let sequence = [""]
    }

}


function deanimate(sequence,loc){
    if(loc>=sequence.length){
        return
    }
    let curr=sequence[loc];
    let id = curr.split("-")[1]
    let action = curr.split("-")[0]

    switch (action){
        case "dg":
            did(id).className = "nvisit";
            break;
        case "ds":
            let histo = document.createElement("div");
            histo.className = "histo";
            histo.id = id;
            did("tile_sort").children[loc].replaceWith(histo)
    }

    setTimeout(function(){
        deanimate(sequence,loc+1);
    },10)
    return
}


function a_sort(action_array,start){
    /*
    * Activate Value = a_val, ex. a_1
    * Lock Value =l_val, ex. l_1
    * Swap Values = s_val1_val2, ex. s_3_10
    * Deactivate Values = d_val, ex. d_1
    * Visit value = v_val, ex v_1
    * Devisit value = dv_val, ex dv_1
    * count value = c_id, ex, c_0 this is specific to the count sort
    * count active by id = ac_val, ex ac_0
    * count deactive by id = dc_val, ex dc_0
    * Replace with histo = r_loc_max_val_len, ex r_0_60_10_400 <-Creates new Histogram to replace current
    * Insert Div = i_val_beforeval, ex i_2_5, insert item 2 before 5
    */
    if(start>=action_array.length){
        return
    }
    let div_array = did("tile_sort").children;
        let actions=action_array[start].split("_");
        let loc = parseInt(actions[1])
        switch(actions[0]){
            case "s":
                let loc2 = parseInt(actions[2])
                let temp2 = div_array[loc2].cloneNode(true);
                let temp1 = div_array[loc].cloneNode(true);
                div_array[loc2].replaceWith(temp1);
                div_array[loc].replaceWith(temp2);
                break;
            case "a":
                div_array[loc].classList.add('s_active');
                break;
            case "d":
                div_array[loc].classList.remove('s_active');
                break;
            case "v":
                div_array[loc].classList.add('s_visit')
                break;
            case "dv":
                let visit = qsa('.s_visit');
                visit.forEach(v=>{
                    v.classList.remove('s_visit');
                })
                break;
            case "l":
                div_array[loc].classList.remove('s_active')
                div_array[loc].classList.add('s_lock');
                break;
            case "c":
                did(action_array[start]).innerHTML = parseInt(did(action_array[start]).innerHTML)+1;
                break;
            case "ac":
                did("c_"+loc).classList.add('s_active')
                break;
            case "dc":
                did("c_"+loc).classList.remove('s_active')
                break;
            case "r":
                let max = parseInt(actions[2]);
                let value = parseInt(actions[3])
                let length = parseInt(actions[4])
                let histo = create_histo(max,value,length);
                div_array[loc].replaceWith(histo)
                break;
            case "i":
                let last_div = did("tile_sort").children[loc]
                let clone_div = last_div.cloneNode(true)
                did("tile_sort").removeChild(last_div)
                did("tile_sort").insertBefore(clone_div,did("tile_sort").children[actions[2]])
                break;
        }
        setTimeout(function(){
            a_sort(action_array,start+1)
        },10)
    }



/*
* This section houses all the sorting related Algoriths
*/

////Sort Variables////
var sort_array=[];
var animation_arr = []
var view_type = "histo";
var length = 0;
var max = 0;

function choose_sort(sort){
    ///Reset ViewPort to Standard////
    let data = did('data').cloneNode(true);
    let sort_stats = did("sort_stats").cloneNode(true);
    removeAllChildNodes(did('view_port'))
    did('view_port').appendChild(sort_stats)
    did('view_port').appendChild(data)
    did('buttons').children[0].setAttribute('onclick','run_sort("'+sort.value+'")');
    if(sort.value=='cs'){
        let count_view = document.createElement('div');
        count_view.id = "count-view"
        let max_val = document.createElement('h3');
        max_val.innerHTML = "Max Value: ";
        let array = document.createElement('div');
        array.id = 'count_array';
        count_view.appendChild(max_val);
        count_view.appendChild(array)
        did('view_port').appendChild(count_view)
    }
    switch (sort.value){
        case "cs":
            did("algo_title").innerHTML = "Counting Sort";
            break;
        case "bs":
            did("algo_title").innerHTML = "Bubble Sort";
            break;
        case "hs":
            did("algo_title").innerHTML = "Heap Sort";
            break;
        case "nv":
            did("algo_title").innerHTML = "Naive Sort";
            break;
        case "qs":
            did("algo_title").innerHTML = "Quick Sort";
            break;
        case "is":
            did("algo_title").innerHTML = "Insertion Sort";
            break;
        case "ms":
            did("algo_title").innerHTML = "Merge Sort";
            break;
    }
}

function  run_sort(sort){
    did("stat_visit").innerHTML = 0;
    if(sort_array==[]||did("sort_values").value==""){
        alert("Input is empty");
        return
    }
    let start_time = new Date().getTime()
    max = Math.max(...sort_array);
    ///Reset the values///
    toggle_sidebar(did("settings"))
    reset();
    switch (sort){
        case "cs":
            count_sort();
            break;
        case "bs":
            bubble_sort();
            break;
        case "hs":
            heap_sort();
            break;
        case "nv":
            naive_sort();
            break;
        case "qs":
            qsort_start();
            break;
        case "is":
            insertion_sort();
            break;
        case "ms":
            merge_sort(sort_array, 0, sort_array.length-1);
            break;
        case "all":
            bubble_sort();
            reset();
            heap_sort();
            reset();
            quick_sort();
            reset();
            naive_sort();
            break;
    }
    let end_time = new Date().getTime()
    did("stat_time").innerHTML = end_time-start_time;
    animate_sort(animation_arr,0);
    animation_arr = [];


}

function instant_animate_sort(action_array,start){
    let div_array = did("data").children;
    for(let i=start;i<action_array.length;i++){
        let actions=action_array[i].split("_");
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
                did("stat_visit").innerHTML = parseInt(did("stat_visit").innerHTML)+1;
                div_array[loc].classList.add('s_active');
                break;
            case "d":
                div_array[loc].classList.remove('s_active');
                break;
            case "v":
                did("stat_visit").innerHTML = parseInt(did("stat_visit").innerHTML)+1;
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
                did("stat_visit").innerHTML = parseInt(did("stat_visit").innerHTML)+1;
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
                let last_div = did('data').children[loc]
                let clone_div = last_div.cloneNode(true)
                did('data').removeChild(last_div)
                did('data').insertBefore(clone_div,did('data').children[actions[2]])
                break;
        }
    }
}

function animate_sort(action_array,start){
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
    let div_array = did("data").children;
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
                did("stat_visit").innerHTML = parseInt(did("stat_visit").innerHTML)+1;
                div_array[loc].classList.add('s_active');
                break;
            case "d":
                div_array[loc].classList.remove('s_active');
                break;
            case "v":
                did("stat_visit").innerHTML = parseInt(did("stat_visit").innerHTML)+1;
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
                did("stat_visit").innerHTML = parseInt(did("stat_visit").innerHTML)+1;
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
                let last_div = did('data').children[loc]
                let clone_div = last_div.cloneNode(true)
                did('data').removeChild(last_div)
                did('data').insertBefore(clone_div,did('data').children[actions[2]])
                break;
        }
        if(speed=="instant"){
            instant_animate_sort(action_array,start+1);
        }
        else{
            setTimeout(function(){
                animate_sort(action_array,start+1)
            },speed)
        }

    }


function isNumeric(val){
    if(parseInt(val)!=val){
        return false;
    }
    else{
        return true
    }
}

function draw_to_viewport(value_array,max){
    let view_port = did("data");
    removeAllChildNodes(view_port);
    for(let i=0;i<value_array.length;i++){
        let histo = create_histo(max,value_array[i],value_array.length)
        view_port.appendChild(histo);
    }
}
function randomnize_sort(){
    let quantity = parseInt(did("n_nodes").value);
    let low = parseInt(did("range_low").value);
    let high = parseInt(did("range_high").value);
    let array_val = Array();
    let input;
    max=10;
    for (let i=0;i<quantity;i++){
        let value = Math.floor(Math.random()*(high-low)+low)
        if(i==0){
            input=value.toString()
        }
        else{
            input=input+","+value.toString()
        }
        if(value>max){
            max=value;
        }
        array_val.push(value)
    }
    draw_to_viewport(array_val,max);
    did('sort_values').value = input;
    sort_array = array_val;

}

function create_histo(max_value,c_value,quantity){
    let height = c_value/max_value*600
    let width = 1350/quantity;
    if(width>25){
        width = 25
    }
    let histo = document.createElement('div');
    histo.setAttribute('style',"width:"+width+"px; height:"+height+"px")
    histo.setAttribute('class','value_box');
    if(width<2){
        let border = 0;
        histo.setAttribute('style',"width:"+width+"px; height:"+height+"px;border:"+border+"px;background-color:black")
    }


    return histo;
}
function visualize_sort(){
    let input = did('sort_values').value;
    if(input[(input.length-1)]==","){
        return
    }
    values = input.split(',');
    let value;
    let array_val = Array();
    max=0;
    for(let i=0;i<values.length;i++){
        value=values[i];
        if(!isNumeric(value)){
            alert("Invalid Input Detected");
            return
        }
        value = parseInt(value);
        if (value>max){
            max=value;
        }
        array_val.push(value);
        }
    
    let view_port = did("data");
    removeAllChildNodes(view_port);
    for(let i=0;i<array_val.length;i++){
        let histo = create_histo(max,array_val[i],array_val.length)
        view_port.appendChild(histo);
    }
    sort_array=array_val;
}

function naive_sort(){
    if(sort_array==[]||did("sort_values").value==""){
        alert("Input is empty");
        return
    }
    for(let i=0;i<sort_array.length;i++){
        let min_pos=i;
        animation_arr.push('a_'+i);
        for(let k=i+1;k<sort_array.length;k++){
            animation_arr.push('v_'+k)
            if(sort_array[k]<sort_array[min_pos]){
                min_pos=k;
            }

        }
        animation_arr.push('a_'+min_pos);
        animation_arr.push('s_'+i+'_'+min_pos);
        animation_arr.push('l_'+i);
        animation_arr.push('d_'+min_pos);
        let temp = sort_array[i];
        sort_array[i]=sort_array[min_pos];
        sort_array[min_pos] = temp;
        animation_arr.push('dv'); 
    }

}

function qsort_start(){    
    qsort(0,sort_array.length);


}

function qsort(left,right){
    animation_arr.push("a_"+left);
    ///array = animation array, qsort sorts the global variable sort_array, not sent in as parameter///
    let l=left+1;
    let r = right-1;
    if(l>(r)){
        animation_arr.push('l_'+left)
        return;
    }
    animation_arr.push('v_'+l);
    animation_arr.push('v_'+r);
    
    let temp;
    while(l<r){
        while(sort_array[l]<=sort_array[left]&&l<r){
            animation_arr.push('v_'+(l));
            l++;
        }
        while(sort_array[r]>=sort_array[left] &&l<r){
            animation_arr.push('v_'+(r))
            r--;
        }
        if(sort_array[l]>sort_array[left]&&sort_array[r]<sort_array[left]&&l<r){
            temp =sort_array[r];
            sort_array[r] = sort_array[l];
            sort_array[l]=temp;
            /// Animations///
            ///Visit///
            animation_arr.push("v_"+l);
            animation_arr.push("v_"+(r))
            ///Swap///
            animation_arr.push("s_"+l+"_"+(r))

            l=l+1;
            r=r-1;
        }

    }

    if(sort_array[l]>=sort_array[left]){
        temp = sort_array[l-1];
        sort_array[l-1]=sort_array[left];
        sort_array[left]=temp;

        ///animation///
        animation_arr.push('s_'+(l-1)+"_"+left);
        animation_arr.push('l_'+(l-1));
        animation_arr.push('dv');

        qsort(left,l-1);
        ///Sent right Side///
        qsort(l,right);
    }
    else{
        temp = sort_array[l];
        sort_array[l]=sort_array[left];
        sort_array[left]=temp;
        
        ///animation///
        animation_arr.push('s_'+(l)+"_"+left);
        animation_arr.push('l_'+(l));
        animation_arr.push('dv');
        qsort(left,l);
        ///Sent right Side///
        qsort(l+1,right);
    }



    return;
}

function insertion_sort(){
    let arr = new Array();
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
    * 
    */
    let n = sort_array.length;
    let start = sort_array;
    // console.log(start);
    for(let i = 1; i < n; i++){
        let key = sort_array[i];
        let j = i - 1;
        animation_arr.push('a_'+i);
        while(j >= 0 && sort_array[j] > key){
            animation_arr.push('v_'+(j+1));
            animation_arr.push('v_'+j);
            sort_array[j + 1] = sort_array[j];
            j--;
        }
        animation_arr.push('dv_'+(j+2));
        animation_arr.push('dv_'+(j+1));
        sort_array[j + 1] = key;
        animation_arr.push('i_'+i+'_'+(j+1));
        animation_arr.push('d_'+(j+1));
    }
    for(let i = 0; i < n; i++){
        animation_arr.push('l_'+i);
    }

}

function merge_sort(arr, l, r){
    merge_sort1(arr, l, r);
    for(let i = 0; i < sort_array.length; i++){
        animation_arr.push('l_'+i);
    }
    animate_sort(animation_arr,0)
    animation_arr=[];
}

function merge_sort1(arr, l, r){
    if (l < r) {
        let m = (l+ Math.floor((r-l)/2));
        merge_sort1(arr, l, m);
        merge_sort1(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

function merge(arr, l, mid, r){
        let n1 = mid - l + 1;
        let n2 = r - mid;
        let L = new Array(n1);
        let R = new Array(n2);
        for(let i = 0; i < n1; ++i){
            animation_arr.push('v_'+(l+i));
            L[i] = arr[l + i];
        }
        for(let j = 0; j < n2; ++j){
            animation_arr.push('v_'+(mid + 1+j));
            R[j] = arr[mid + 1 + j];
        }
        let i = 0
        let j = 0;
        let k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                animation_arr.push('a_'+k);
                arr[k] = L[i];
                animation_arr.push('r_'+k+'_'+max+'_'+L[i]+'_'+sort_array.length);
                animation_arr.push('d_'+k);
                animation_arr.push('v_'+k);
                i++;
            }
            else {
                animation_arr.push('a_'+k);
                arr[k] = R[j];
                animation_arr.push('r_'+k+'_'+max+'_'+R[j]+'_'+sort_array.length);
                animation_arr.push('d_'+k);
                animation_arr.push('v_'+k);
                j++;
            }
            k++;
        }
        while (i < n1) {
            animation_arr.push('a_'+k);
            arr[k] = L[i];
            animation_arr.push('r_'+k+'_'+max+'_'+L[i]+'_'+sort_array.length);
            animation_arr.push('d_'+k);
            animation_arr.push('v_'+k);
            i++;
            k++;
        }
        while (j < n2) {
            animation_arr.push('a_'+k);
            arr[k] = R[j];
            animation_arr.push('r_'+k+'_'+max+'_'+R[j]+'_'+sort_array.length);
            animation_arr.push('d_'+k);
            animation_arr.push('v_'+k);
            j++;
            k++;
        }
        animation_arr.push('dv');

}

function count_sort(){
    if(sort_array==[]||did("sort_values").value==""){
        alert("Input is empty");
        return
    }

    /*Create UI Specific features for Count Sort*/
    removeAllChildNodes(did('count_array'))
    let max = 0;
    for(let i=0;i<sort_array.length;i++){
        animation_arr.push('v_'+i)
        if(sort_array[i]>max){
            max=sort_array[i]
        }
    }
    animation_arr.push('dv');
    did('count-view').children[0].innerHTML = "Max Value: "+max;
    ////Inititialized Sample Arrau Box////
    let arr_box = document.createElement('div');
    let arr = document.createElement('div');
    let arr_val = document.createElement('h6')
    let box_size;
    arr_box.className = "array_box";
    arr_box.innerHTML = 0;
    if(1300/max>30){
        box_size=30
        arr_box.setAttribute('style','width:'+box_size+"px; height:"+box_size+"px")
    }
    else if(1300/max<25){
        box_size=26;
        arr_box.setAttribute('style','width:'+box_size+"px; height:"+box_size+"px")

    }
    else{
        box_size=1300/max
        arr_box.setAttribute('style','width:'+box_size+"px; height:"+box_size+"px")
    }

    ///Sample Array Box///
    arr.appendChild(arr_box);
    arr.appendChild(arr_val);

    ///Initialize empty divs for array
    let top = document.createElement('div')
    let bottom = document.createElement('div')

    if(max<50){
        for(let i=0;i<=max;i++){
            let clone = arr.cloneNode(true)
            clone.children[0].id = 'c_'+i;
            clone.children[1].innerHTML = i
            top.appendChild(clone);
        }
    }
    else if(max<=100){
        for(let i=0;i<=50;i++){
            let clone = arr.cloneNode(true)
            clone.children[0].id = 'c_'+i;
            clone.children[1].innerHTML = i
            top.appendChild(clone);
        }
        for(let i=51;i<=max;i++){
            let clone = arr.cloneNode(true)
            clone.children[0].id = 'c_'+i;
            clone.children[1].innerHTML = i
            bottom.appendChild(clone);
        }
    }
    else{
        top.innerHTML="TOO MANY VALUES, CANNOT FORMAT ARRAYS THE MAX MUST BE LESS THAN 100"
    }
    did('count_array').appendChild(top)
    did('count_array').appendChild(bottom)
    /*End of UI for Count Sort*/

    ////Sorting Algorithm////
    let c_array=new Array(max+1).fill(0);
    for(let i=0;i<sort_array.length;i++){
        animation_arr.push('v_'+i);
        if(max<=100){
            animation_arr.push('c_'+sort_array[i]);
        }
        c_array[sort_array[i]]++;
    }
    let loc=0;
    for(let i=0;i<c_array.length;i++){
        if(max<=100){
            animation_arr.push('ac_'+i);
        }
        for(let k=0;k<c_array[i];k++){
            animation_arr.push('r_'+loc+'_'+max+'_'+i+"_"+sort_array.length);
            animation_arr.push("l_"+loc);
            loc++;
        }
        if(max<=100){
            animation_arr.push('dc_'+i)
        }
    }
    animation_arr.push('dv')

}

function heap_sort(){
    if(sort_array==[]||did("sort_values").value==""){
        alert("Input is empty");
        return
    }
    let heap_array =[0]
    let heap_pos = [0]

    for(let i=0;i<sort_array.length;i++){
        ///Inserts all values into a heap array sorting them in the heap
        let n = heap_insert(heap_array,heap_pos,sort_array[i],i,animation_arr);
        heap_array = n[0]; heap_pos = n[1]; animation_arr = n[2]
    }
    while(heap_array.length>1){
        let n=heap_remove(heap_array,heap_pos,animation_arr);
        heap_array = n[0]; heap_pos = n[1]; animation_arr = n[2]
    }

}

///Bubble Sort///
function bubble_sort(){
    if(sort_array==[]||did("sort_values").value==""){
        alert("Input is empty");
        return
    }
    let sorted =0;
    while(sorted==0){
        sorted=1;
        animation_arr.push('a_0');
        for(let i=0;i<sort_array.length-1;i++){
            animation_arr.push('a_'+(i+1));
            if(sort_array[i]>sort_array[i+1]){
                sorted=0;
                let temp = sort_array[i];
                sort_array[i] = sort_array[i+1];
                sort_array[i+1]=temp;
                animation_arr.push('s_'+i+'_'+(i+1))
            }
            animation_arr.push('d_'+i);
        }
        animation_arr.push('d_'+(sort_array.length-1));
    }
    for(let i=0;i<sort_array.length;i++){
        animation_arr.push('l_'+i);
    }

}


////
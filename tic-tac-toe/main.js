let bordElement = document.getElementsByClassName("bord_row-section_box");
let counter = 0;
for(let i = 0; i < bordElement.length; i++){
    bordElement[i].onclick = () => {
        if(bordElement[i].style.backgroundColor == "" ){
            if(counter++ % 2 == 1  ){
                bordElement[i].style.backgroundColor = "darkslateblue";
            }
            else{
                bordElement[i].style.backgroundColor = "orange";
            }
            console.log("no click");
        }else{
            console.log("click");
        }
    }
}
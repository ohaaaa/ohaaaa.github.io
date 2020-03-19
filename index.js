charset = 'utf-8';

let lodingsbox = document.querySelector('#lodingbox');
let lodings = document.querySelector('#lodings');
let mainbox = document.querySelector('#mainbox');

//loding动画
function stripeLodingStart(){
    let stripecolor=['#ff2e63','#f08a5d','#f9ed69','#30e3ca','#364f6b','#ff2e63','#f08a5d','#f9ed69','#30e3ca','#364f6b'];
    let stripeloding = document.querySelector('#stripeloding');
    let stripecount = stripeloding.children.length;
    let stripestyle;
    // stripeloding.style.animation='fadeout 3s linear '+1+'s forwards';
    for(let i=0;i<stripecount;i++){
        // stripestyle = window.getComputedStyle(stripeloding.children[i],null);
        // stripestyle.backgroundColor = stripecolor[i];
        stripeloding.children[i].style.backgroundColor=stripecolor[i];
        stripeloding.children[i].style.animation='stripeloding 3s ease '+i*0.3+'s infinite';
    }
}

//loding完成延时
function lodingDown1(){
    setTimeout(function(){
        lodingbox.style.display='none';
        mainbox.style.display='block';
        // mainbox.style.animation='fadein 3s linear '+0+'s forwards';
    },4000);
}

window.onload=function(){
    stripeLodingStart();
    lodingDown();

}


let searchname = document.querySelector('.search-name');
let searchlink = document.querySelector('.search-link');
let searchadd = document.querySelector('.search-add');
let searchgo = document.querySelector('.search-go');
let searchcancel = document.querySelector('.search-cancel');
let billboards = document.querySelector('#billboards');
let pages = document.querySelector('#pages');
let links = document.querySelector('#links');

let isalter=false;
let alterindex = -1;

//得到link总数
function getLinksCount(){
    return links.children.length;
}

//还原search输入框
function recoversearch(){
    searchname.value='';
    searchlink.value='';
}

//search输入搜寻
searchgo.onclick=function(){
    recoversearch();
}

//取消search输入
searchcancel.onclick=function(){
    recoversearch();
}

//增加link
searchadd.onclick = function(){
    if(searchname.value.trim()===''){
        alert('未输入书签名')
        return;
    }
    if(searchlink.value.trim()===''){
        alert('未输入链接')
        return;
    }
    if(!isalter){
        let linkscount = getLinksCount()*1-1;
        //1.克隆节点
        let lilink = links.children[0].cloneNode(true);
    
        //3.修改节点内容

        //修改时间先后索引
        let lilinkindex = lilink.querySelector('.link-index');
        lilinkindex.children[0].innerHTML=links.lastElementChild.querySelector('.link-index').children[0].innerHTML*1+1;
    
        //修改文本
        let lilinkcontent = lilink.querySelector('.link-content');
        lilinkcontent.children[0].innerHTML=searchname.value;
        //修改链接
        lilinkcontent.children[0].href=searchlink.value;
    
        let lilinkright = lilink.children[2];
        //推荐生效
        let lilinktotop = lilinkright.children[0];
        lilinktotop.onclick = function(){
            let linktop = billboards.children[0];
            linktop.children[1].children[0].innerHTML = lilinkcontent.children[0].innerHTML;
            linktop.children[1].children[0].href = lilinkcontent.children[0].href;
        }
    
        //修改生效
        let lilinkalter = lilinkright.children[1];
        lilinkalter.onclick=function(){
            isalter=true;
            alterindex = lilinkindex.children[0].innerHTML;
            searchname.value=lilinkcontent.children[0].innerHTML;
            searchlink.value=lilinkcontent.children[0].href;
        }
    
        let lilinkdelete = lilinkright.children[2];
        //删除生效
        lilinkdelete.onclick=function(){
            if(!isalter){
                if(confirm('您真的要删除这条书签吗?')){
                    // links.removeChild(lilink);
                   lilink.remove();
                }
                // recoversearch();
            }else{
                isalter=false;
                alterindex = -1;
                //回复初始状态
                recoversearch();
            }
            
        }

        //2.增加节点
        links.appendChild(lilink);
        
        //显示分页
        if(linkscount>4){
            document.querySelector("#pageturn").style.display='flex';
        }


    }else{
        isalter=false;
        if(alterindex===-1){
            alert('功能尚未完善，可以提醒管理员')
        }
        let linkscount = getLinksCount();
        for(let i=0;i<linkscount;i++){
            let link = links.children[i];
            let linkindex = link.querySelector('.link-index').children[0].innerHTML;
            if(linkindex === alterindex){
                let lilinkcontent = link.children[1];
                lilinkcontent.children[0].innerHTML=searchname.value;
                lilinkcontent.children[0].href=searchlink.value;
            }
        }
    }


    //回复初始状态
    recoversearch();
}

//所有link删除生效
function enDeleteLink(){
    let linkscount = getLinksCount();
    let link;
    let linkright;
    let linkdelete;
    for(let i=0;i<linkscount;i++){
        link = links.children[i];
        linkright = link.children[2];
        linkdelete = linkright.children[2];

        linkdelete.onclick=function(){
            if(!isalter){
                if(confirm('您真的要删除这条书签吗?')){
                    links.removeChild(link);
                }
                // recoversearch();
            }else{
                isalter=false;
                alterindex = -1;
                //回复初始状态
                recoversearch();
            }
        }
    }
}
enDeleteLink();

//所有修改生效
function enAlterLink(){
    let linkscount = getLinksCount();
    for(let i=0;i<linkscount;i++){
        let lilink = links.children[i];
        let lilinkcontent = lilink.children[1];
        let lilinkright = lilink.children[2];
        let lilinkalter = lilinkright.children[1];
        lilinkalter.onclick=function(){
            isalter=true;
            alterindex = links.lastElementChild.children[0].children[0].innerHTML;
            searchname.value=lilinkcontent.children[0].innerHTML;
            searchlink.value=lilinkcontent.children[0].href;
        }
    }
}
enAlterLink();

//所有推荐生效
function enTopLink(){
    let linkscount = getLinksCount();
    for(let i=0;i<linkscount;i++){
        let lilink = links.children[i];
        let lilinkcontent = lilink.children[1];
        let lilinkright = lilink.children[2];
        let lilinkalter = lilinkright.children[0];
        lilinkalter.onclick=function(){
            let linktop = billboards.children[0];
            linktop.children[1].children[0].innerHTML=lilinkcontent.children[0].innerHTML;
            linktop.children[1].children[0].href=lilinkcontent.children[0].href;
        }
    }
}
enTopLink();
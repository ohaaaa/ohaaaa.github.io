let data = [
    {
        index:'0',
        tindex:'',
        src:'../images/001.png',
        username:'Meow',
        commentdate:'2019-11-04',
        isliked:false,
        isadd:false,
        addwho:'',
        likedcount:'1200',
        addcount:'1200',
        content:'能请你跳支舞吗？',
        comments:[
            {
                username:'可爱的红',
                content:'可以呀'
            }
        ]
    }
]

//textarea标签自适应增大
function autoTextarea(){
    let textarea = document.getElementById('fit2')
    let pre = document.getElementById('fit1');
    pre.innerHTML = textarea.value;
    let realHeight = pre.offsetHeight;//offsetHeight = height + padding + border
    if(realHeight <= 50) textarea.style.height = (realHeight ) +0+ 'px'; //加24为一行的高度
    else textarea.style.height = realHeight +24+ 'px';
}

let addwho='';
let whoadd='';
let isadd = false;
let tempcontent;
let contentscount = 0;
let comments = document.querySelector("#comments");
let commentshead = comments.firstElementChild;
let commentscontents = document.querySelector(".comments-contents");
let nocomments = document.querySelector(".nocomments");
let editsubmitright = document.querySelector('.edit-submit-right');
let editsubmitleft = document.querySelector('.edit-submit-left');
let randomName=['ohaaaa','aou','zzz','2333','mouuu'];
let editarea = document.getElementById('editArea');
let commenttextarea = document.getElementById('fit2');

editsubmitright.children[0].onclick=function(){
    if(commenttextarea.value.trim()===''){
        alert('未输入评论内容！')
        return;
    }
    if(!isadd){
        
        commentscontents.style.display='block';
        nocomments.children[0].innerHTML='无更多评论';
    
        //新增评论子节点
        newConmments();
    
        //使新评论面板上的举报按钮生效
        commentReport();
    
        //使新评论面板上的点赞按钮生效
        commentLike();
    
        //使新评论面板上的追评按钮生效
        addcomments()
    
        //得到并修改总主副评论数
        let commentscount=getContentsCount()*1-1;
        commentshead.children[0].children[0].innerHTML='（'+commentscount+'）';
    }else{

        commentscontents.style.display='block';
        nocomments.children[0].innerHTML='无更多评论';

        //新增追评子节点
        newAddComments();

        //得到并修改总主副评论数
        let commentscount=getContentsCount()*1-1;
        commentshead.children[0].children[0].innerHTML='（'+commentscount+'）';

    }
}

let nameindex=0;
//新增评论节点
function newConmments(){
    let licontent = commentscontents.children[0].cloneNode(true);
    /*******修改评论头部*****/
    let licontenttop = licontent.children[0];
    //修改头像
    licontenttop.children[0].children[0].src='../images/002.png';
    //修改名字
    licontenttop.children[1].children[0].innerHTML=randomName[nameindex++];
    if(nameindex>4){
        nameindex=0;
    }
    //修改日期
    // let date = getdate();
    licontenttop.children[1].children[1].innerHTML=getdate();
    //点赞数
    licontenttop.children[2].children[0].innerHTML=0;
    //追评数
    licontenttop.children[2].children[3].innerHTML=0;

    /*******修改评论中部*****/
    let licontentcenter = licontent.children[1];
    //修改评论内容
    // let mycontent = 
    licontentcenter.children[0].innerHTML=commenttextarea.value;
    //清空原输入框的内容
    commenttextarea.value='';

    /*******修改追加评论*****/
    let liaddcontent = licontent.children[1].children[1];

    /*******修改评论底部*****/
    // let licontentbottom = licontent.children[2];

    liaddcontent.children[0].style.display='none';
    commentscontents.appendChild(licontent);
}

//新增追评节点
function newAddComments(){
    let commentscount = getContentsCount();
    for(let i=0;i<commentscount;i++){
        if(commentscontents.children[i].children[0].children[1].children[0].innerHTML===addwho){
            //此追评者
            let currentcontent = commentscontents.children[i];
            //此追评者的追评数
            let currentaddcontents = currentcontent.children[1].children[1];

            //克隆节点
            let addlicomment = document.querySelector('.comments-addcomment').cloneNode(true);
            //修改追加评论的姓名
            addlicomment.children[0].innerHTML=randomName[nameindex++];
            if(nameindex>4){
                nameindex=0;
            }
            //修改追加评论的内容
            addlicomment.children[1].innerHTML=commenttextarea.value;

            //增加追加评论
            // currentcontent.appendChild(addlicomment);
            currentaddcontents.appendChild(addlicomment);
            // currentaddcontents.style.display='block';

            //增加此被追评者的追评数
            //此追评者的头部
            let currentcontenttop = currentcontent.children[0];
            let tempcount = currentcontenttop.children[2].children[3].innerHTML;
            tempcount=tempcount*1+1;
            currentcontenttop.children[2].children[3].innerHTML=tempcount;

            // commenttextarea.setAttribute('isadd','false');
            isadd = false;
            // commenttextarea.setAttribute('addwho','');
            commenttextarea.value='';
            addwho=''
            commenttextarea.placeholder='请在这里输入评论内容';
        }
    }
}

//使新评论面板上的举报按钮生效
function commentReport(){
    let commentscontentbottoms = document.querySelectorAll(".comments-content-bottom");
    // console.dir(commentscontentbottoms);
    for(let i=0;i<commentscontentbottoms.length;i++){
        commentscontentbottoms[i].children[0].onclick=function(){
            let report = commentscontentbottoms[i].children[1];
            if(report.style.display==='flex'){
                report.style.display='none';
            }
            else{
                report.style.display='flex'
            }
        }
    }
}
commentReport();

//使点赞生效
function commentLike(){
    let commentscount = getContentsCount();
    for(let i=0;i<commentscount;i++){
        let licontent = commentscontents.children[i];
        let licontenttop = licontent.children[0];
        licontenttop.children[2].children[1].onclick=function(){
            if(!this.getAttribute('isliked')){
                this.children[0].src='../images/liked_small.png';
                this.setAttribute('isliked','true');
                let tempcount = licontenttop.children[2].children[0].innerHTML;
                tempcount = tempcount*1+1;
                licontenttop.children[2].children[0].innerHTML=tempcount;
            }else{
                alert('您已经点过赞了');
            }
        }
    }
}
commentLike();

//使追评生效
function addcomments(){
    let commentscount = getContentsCount();
    for(let i=0;i<commentscount;i++){
        let licontent = commentscontents.children[i];
        let licontenttop = licontent.children[0];
        licontenttop.children[2].children[2].onclick=function(){
            commenttextarea.focus();
            commenttextarea.setAttribute('isadd','true');
            //获取对方的名字
            let tempname = licontenttop.children[1].children[0].innerHTML;
            // commenttextarea.setAttribute('addwho','tempname');
            commenttextarea.setAttribute('isadd','true');
            isadd = true;
            addwho = tempname;
            commenttextarea.placeholder='回复@'+tempname;
        }
    }
}
addcomments();

editsubmitleft.onclick=function(){
    commenttextarea.setAttribute('isadd','false');
    // commenttextarea.setAttribute('addwho','');
    commenttextarea.value='';
    isadd = false;
    addwho=''
    commenttextarea.placeholder='请在这里输入评论内容';
}

//得到总主评论数
function getContentsCount(){
    let commentscount;
    if(commentscontents.style.display===''){
        commentscount = 0;
        // alert(1);
    }else{
        commentscount = commentscontents.children.length;
    }
    return commentscount;
}

//得到总主副评论数
function getAllContentsCount(){
    let commentscount;
    let allcommentscount=0;
    if(commentscontents.style.display===''){
        allcommentscount = 0;
        // alert(1);
    }else{
        commentscount = commentscontents.children.length;
        for(let i=0;i<commentscount;i++){
            let licontent = commentscontents.children[i];
            let addlicomments = licontent.children[1].children[1]
            allcommentscount = allcommentscount + addlicomments.children.length;
        }
    }
    return allcommentscount;
}

//得到当前时间日期
function getdate(){
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    if(month<10){
        month='0'+month;
    }
    if(day<10){
        day='0'+day;
    }
    return (year +'-'+month+'-'+day);
}

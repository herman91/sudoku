module.exports = function solveSudoku(matrix) {
  // your solution
    function clone(obj) {
        if (obj == null || typeof(obj) != 'object') {
            return obj;
        }
        var temp = obj.constructor();
        for (var key in obj) {
            temp[key] = clone(obj[key]);

        }
        return temp;
    }


    function Diffarr (a1, a2) {
        var a = [], diff = [];
        for (var i = 0; i < a1.length; i++) {
            a[a1[i]] = true;
        }
        for (var i = 0; i < a2.length; i++) {
            if (a[a2[i]]) {
                delete a[a2[i]];
            } else {
                a[a2[i]] = true;
            }
        }
        for (var k in a) {
            diff.push(k);
        }
        for (i=0;i<diff.length;i++){
            if (typeof diff[i]!=="object"){
                diff[i]=diff[i]*1
            }
        }
        return diff;
    }

    function SQUARE(array,ii,jj) {

        var num=[1,2,3,4,5,6,7,8,9];
        var temp=[];
        for (iie = ii; iie < ii + 3; iie++) {
            for (jje = jj; jje < jj + 3; jje++) {
                temp.push(array[iie][jje])
            }
        }
        var d=Diffarr(temp,num);
        for (r=0;r<d.length;r++){
            if (d[r]===0){
                d.splice(r,1);
            }
        }
        for (y=0;y<d.length;y++) {
            if(d[y]/d[y]!==1){
                d.splice(y,1)
            }
        }

        return(d);
    }

    function swap(k) {
        op=0;
        if (k<3){
            op=0;
        }
        if ((k>2)&&(k<6)){
            op=3;
        }
        if (k>5){
            op=6;
        }
        return(op);
    }

    function sqARRAY(array) {
        for (i=0;i<array.length;i++){
            for (j=0;j<array[i].length;j++){
                if (array[i][j]===0){
                    ii=swap(i);
                    jj=swap(j);
                    array[i][j]=SQUARE(array,ii,jj);
                }

            }

        }
        return(array)
    }

    function unicArr(a,b,c) {
        for (i=0;i<b.length;i++){
            a.push(b[i]);
        }
        for (j=0;j<c.length;j++){
            a.push(c[j])
        }

        for (i=0;i<a.length;i++){
            for (j=i+1;j<a.length;j++){
                if(a[i]===a[j]){
                    a.splice(i,1);
                    i=0;
                }
            }
        }
        return(a);
    }

    function rotateCounterClockwise(a){
        var n=a.length;
        for (var i=0; i<n/2; i++) {
            for (var j=i; j<n-i-1; j++) {
                var tmp=a[i][j];
                a[i][j]=a[j][n-i-1];
                a[j][n-i-1]=a[n-i-1][n-j-1];
                a[n-i-1][n-j-1]=a[n-j-1][i];
                a[n-j-1][i]=tmp;
            }
        }
        return a;
    }

    function rotateClockwise(a) {
        var n=a.length;
        for (var i=0; i<n/2; i++) {
            for (var j=i; j<n-i-1; j++) {
                var tmp=a[i][j];
                a[i][j]=a[n-j-1][i];
                a[n-j-1][i]=a[n-i-1][n-j-1];
                a[n-i-1][n-j-1]=a[j][n-i-1];
                a[j][n-i-1]=tmp;
            }
        }
        return a;
    }

    function rowandline(a) {
        aa=a;
        elem=[1,2,3,4,5,6,7,8,9];
        for (i=0;i<aa.length;i++){
            for (j=0;j<elem.length;j++){
                if (aa[i]===elem[j]){

                    elem.splice(j,1);
                }
            }

        }

        for (i=0;i<aa.length;i++){
            if (a[i]===0){
                a[i]=elem;
            }
        }

        return(a);
    }
    function intersect_arrays(a, b) {
        var sorted_a = a.concat().sort();
        var sorted_b = b.concat().sort();
        var common = [];
        var a_i = 0;
        var b_i = 0;

        while (a_i < a.length
        && b_i < b.length)
        {
            if (sorted_a[a_i] === sorted_b[b_i]) {
                common.push(sorted_a[a_i]);
                a_i++;
                b_i++;
            }
            else if(sorted_a[a_i] < sorted_b[b_i]) {
                a_i++;
            }
            else {
                b_i++;
            }
        }
        return common;
    }

    function TreeArrays(a,b,c) {
        var d=(intersect_arrays(a,b));
        d=intersect_arrays(d,c);
        if (d.length===1){
            d=d[0];
        }
        return(d)
    }

    function checkTreeRows(are) {
        for (i=0;i<are.length;i++){
            switch (i) {
                case 0:
                case 3:
                case 6:
                    stroka=1;
                    break;
                case 1:
                case 4:
                case 7:
                    stroka=2;
                    break;
                case 2:
                case 5:
                case 8:
                    stroka=3;
                    break
            }
            var swer=false;

            for (j=1;j<are[i].length-1;j++){

                leftClm=[];
                rightClm=[];

                if((typeof are[i][j]=="object")&&(are[i][j].length=2)){
                    at=are[i][j];
                    for (ii=0;ii<are.length;ii++){
                        leftClm.push(are[ii][j-1]);
                        rightClm.push(are[ii][j+1])
                    }

                    leftClm=delArr(leftClm);
                    rightClm=delArr(rightClm);


                    if ((stroka===1)&&(typeof are[i+1][j]!="object")&&(typeof are[i+2][j]!="object")){

                        swer=true;
                    }
                    if ((stroka===2)&&(typeof are[i-1][j]!="object")&&(typeof are[i+1][j]!="object")){
                        swer=true;
                    }
                    if ((stroka===3)&&(typeof are[i-1][j]!="object")&&(typeof are[i-2][j]!="object")){
                        swer=true;
                    }

                    ert=TreeArrays(leftClm,are[i][j],rightClm);

                    if ((ert.length!==0)&&(swer===true)){
                        are[i][j]=ert;
                    }


                    ert=0;
                }


            }
        }
        return(are);
    }
    function delArr(b) {
        for(iad=0;iad<b.length;iad++){
            if(typeof b[iad]==="object"){
                b.splice(iad,1);
                iad=0
            }
        }
        return(b)
    }


    function lastA(initial,c1,c2) {
        lastArray=clone(initial);
        lineArray=clone(lastArray);
        rowArray=clone(lastArray);
        squareArray=clone(lastArray);
        for (o=0;o<lineArray.length;o++){
            lineArray[o]=rowandline(lineArray[o])
        }


        rowArray=rotateCounterClockwise(rowArray);
        for (o=0;o<lineArray.length;o++){
            rowArray[o]=rowandline(rowArray[o])
        }
        rowArray=rotateClockwise(rowArray);

        squareArray=sqARRAY(squareArray);


        for (ii=0;ii<lastArray.length;ii++){
            for (jj=0;jj<lastArray[ii].length;jj++){
                if (lastArray[ii][jj]===0){
                    lastArray[ii][jj]=TreeArrays(lineArray[ii][jj],rowArray[ii][jj],squareArray[ii][jj])
                }

            }
        }

        return(lastArray);
    }

    function torntoZer(lastArray) {
        for (i=0;i<lastArray.length;i++) {
            for (j = 0; j < lastArray[i].length; j++) {
                if((typeof lastArray[i][j]==="object")&&(lastArray[i][j].length>1)){
                    lastArray[i][j]=0;
                }
            }
        }
        return(lastArray)
    }


    const initial = matrix;

    a=initial;

    kk=0;

    var kkk;
    for (rrr=1;rrr<20;rrr++){

        k=0;
        for (e=0;e<a.length;e++){
            for (j=0;j<a[e].length;j++){
                if (a[e][j]===0){
                    k++
                }
            }
        }
        kt=0;


        a=lastA(a,kt,k);
        a=torntoZer(lastArray);
        if (kkk===k){
            a=lastA(a,kt,k);
            lastArray=checkTreeRows(lastArray);
        }

        kkk=k;
    }
    return(a)
}


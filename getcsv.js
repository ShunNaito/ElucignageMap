function loadcsv(url) {
    var httpObj = new XMLHttpRequest();
    httpObj.open('GET',url+"?"+(new Date()).getTime(),false);
    // ?�ȍ~�̓L���b�V�����ꂽ�t�@�C���ł͂Ȃ��A����ǂݍ��ނ��߂̂���
    httpObj.send(null);
    var rows = httpObj.responseText.split("\r\n");
    var data = new Array();

    var n;
    for (n = 1; n < rows.length; n++) {
    	var fields = rows[n].split(",");
    	date = fields[1];
    	text = fields[2];
        data.push({'date': date, 'text': text});
    }
    return data;
}

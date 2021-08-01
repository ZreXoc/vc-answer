var answer;

$.ajax({
    url: "./answer.json",
    dataType: "json",
    success: function(response) {
        answer = response.data;
    },
});

function getAnswer() {
    day = $('#day').val() - 1;

    const first = 63796;

    $.ajax({
        url: "./map.json",
        dataType: "json",
        success: function(response) {
            const tasks = response.data.stage[0].days[day].tasks[0].task_detail;

            let start = tasks[0].content_id,
                end = tasks[tasks.length - 1].content_id; //获取课时对应题号
            console.log(start, end);

            let taskAnswer = answer.slice(start - first, end - first + 1); //截取答案
            const d = $("#display-answer");
            d.empty();
            taskAnswer.forEach((ans, i) => {
                ans = ans.answer.replaceAll(/#{3}/g, "; ").replace(/\|/g, " 或 ");
                d.append(`<span>${i+1}: ${ans}</span><br/>`);

            });
            console.log(start - first, end - first + 1, taskAnswer)
        }
    });
}
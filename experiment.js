document.addEventListener('DOMContentLoaded', function() {
    fetch('materials.csv').then(response => response.text()).then(data => {
        const parsedData = Papa.parse(data, {
            header: true,
            dynamicTyping: true
        }).data;

        const timeline = [];

        parsedData.forEach(item => {
            const trial = {
                type: 'html-keyboard-response',
                stimulus: item.contents,
                prompt: '<p>按 "F" 表示词汇有意义，按 "J" 表示词汇无意义</p>',
                choices: ['f', 'j'],
                data: {
                    word: item.contents
                }
            };
            timeline.push(trial);
        });

        jsPsych.init({
            timeline: timeline,
            on_finish: function() {
                jsPsych.data.get().localSave('csv','results.csv');
            }
        });
    });
});

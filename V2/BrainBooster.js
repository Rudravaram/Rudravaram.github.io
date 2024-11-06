     var total_number_of_questions = 0;
        function onPrintOptionsClicked()
        {
            var printLayout = document.querySelector('input[name="printLayout"]:checked').value;
            if (printLayout === 'single') {
                document.querySelectorAll('.section').forEach(section => {
                    section.style.pageBreakBefore = 'auto';
                });
            } else {
                document.querySelectorAll('.section').forEach(section => {
                    section.style.pageBreakBefore = 'always';
                });
            }
        }
        function CheckAnswers() {
            var i = 1;
            var marks = 0;
            while (i <= total_number_of_questions) {
                var id1 = "user_answer" + i;
                var id2 = "correct_answer" + i;
                var userAns = parseFloat(document.getElementById(id1).value);
                var correctAns = parseFloat(document.getElementById(id2).value);
                var resultId = "result" + i;
                var questionDiv = document.getElementById(id1).closest('.question');
                if (userAns === correctAns) {
                    marks = marks + 1;
                    document.getElementById(id1).classList.remove('wrong');
                    questionDiv.classList.remove('wrong');
                    document.getElementById(resultId).innerText = "  Correct!";
                    document.getElementById(resultId).classList.add('correct');
                } else {
                    document.getElementById(id1).classList.add('wrong');
                    questionDiv.classList.add('wrong');
                    document.getElementById(resultId).innerText = "  X! Correct answer: " + correctAns.toFixed(2);
                }
                i = i + 1;
            }
            document.getElementById("CheckAnswers").disabled = true;
            document.getElementById("resultDisplay").innerText = marks + "/" + total_number_of_questions;
        }
    
        function getRandomIntInclusive(min, max) {
            const minCeiled = Math.ceil(min);
            const maxFloored = Math.floor(max);
            return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
        }
    
        function DesignQuestionPaper(questionCount, operation, minNum1, maxNum1, minNum2, maxNum2, sectionId, answerSectionId) {
            var i = 1;
            while (i <= questionCount) {
                total_number_of_questions = total_number_of_questions + 1;
                var num1 = getRandomIntInclusive(minNum1, maxNum1);
                var num2 = getRandomIntInclusive(minNum2, maxNum2);
    
                if ((operation === '-' || operation === '÷') && num2 > num1) {
                    var num = num1;
                    num1 = num2;
                    num2 = num;
                }
    
                var ans = 0;
                if (operation === 'X')
                    ans = num1 * num2;
                if (operation === '+')
                    ans = num1 + num2;
                if (operation === '-')
                    ans = num1 - num2;
                if (operation === '÷')
                    ans = num1 / num2;
    
                var displayAns = ans % 1 === 0 ? ans : ans.toFixed(2);
    
                var id1 = "user_answer" + total_number_of_questions;
                var id2 = "correct_answer" + total_number_of_questions;
                var resultId = "result" + total_number_of_questions;
                var question = "<div class='question'><span>" + num1 + " " + operation + " " + num2 + " = </span> <input type='text' id='" + id1 + "' /> <input type='text' hidden value='" + displayAns + "' id='" + id2 + "' /> <span class='result' id='" + resultId + "'></span></div>";
                document.getElementById(sectionId).innerHTML += question;
    
                // Append the answer to the respective answer section
                var answer = "<div><span>&nbsp;&nbsp;" + num1 + " " + operation + " " + num2 + " = " + displayAns + "</span></div>";
                document.getElementById(answerSectionId).innerHTML += answer;
    
                i = i + 1;
            }
        }
        var questionGenerated=false;
        function OnPrintClicked() {
            if(questionGenerated === false)
            {
                 generateQuestions();
            }
            window.print();
        }
        function generateQuestions() {
            questionGenerated=true;
            var num1Digits = parseInt(document.getElementById('num1Digits').value);
            var num2Digits = parseInt(document.getElementById('num2Digits').value);
            var numDivisionQuestions = parseInt(document.getElementById('numDivisionQuestions').value);
            var numAdditionQuestions = parseInt(document.getElementById('numAdditionQuestions').value);
            var numSubtractionQuestions = parseInt(document.getElementById('numSubtractionQuestions').value);
            var numMultiplicationQuestions = parseInt(document.getElementById('numMultiplicationQuestions').value);
    
            var minNum1 = Math.pow(10, num1Digits - 1);
            var maxNum1 = Math.pow(10, num1Digits) - 1;
            var minNum2 = Math.pow(10, num2Digits - 1);
            var maxNum2 = Math.pow(10, num2Digits) - 1;
    
            document.getElementById('divisionSection').innerHTML = '<h3>Division Questions</h3>';
            document.getElementById('additionSection').innerHTML = '<h3>Addition Questions</h3>';
            document.getElementById('subtractionSection').innerHTML = '<h3>Subtraction Questions</h3>';
            document.getElementById('multiplicationSection').innerHTML = '<h3>Multiplication Questions</h3>';
            document.getElementById('answersSection').innerHTML = '<h3>Answers</h3><div id="divisionAnswers"><h3>Division Answers</h3></div><div id="additionAnswers"><h3>Addition Answers</h3></div><div id="subtractionAnswers"><h3>Subtraction Answers</h3></div><div id="multiplicationAnswers"><h3>Multiplication Answers</h3></div>';
    
            total_number_of_questions = 0;
    
            document.getElementById('divisionSection').style.display = 'flex';
            document.getElementById('additionSection').style.display = 'flex';
            document.getElementById('subtractionSection').style.display = 'flex';
            document.getElementById('multiplicationSection').style.display = 'flex';
            document.getElementById("CheckAnswers").disabled = false;
    
            
            onPrintOptionsClicked();
            DesignQuestionPaper(numDivisionQuestions, '÷', minNum1, maxNum1, minNum2, maxNum2, 'divisionSection', 'divisionAnswers');
            DesignQuestionPaper(numAdditionQuestions, '+', minNum1, maxNum1, minNum2, maxNum2, 'additionSection', 'additionAnswers');
            DesignQuestionPaper(numSubtractionQuestions, '-', minNum1, maxNum1, minNum2, maxNum2, 'subtractionSection', 'subtractionAnswers');
            DesignQuestionPaper(numMultiplicationQuestions, 'X', minNum1, maxNum1, minNum2, maxNum2, 'multiplicationSection', 'multiplicationAnswers');
        }
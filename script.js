let currentAnswer = "";
let currentHint = "";
let lastQuestionType = "";

let scoreCorrect = 0;
let scoreIncorrect = 0;
let scoreSkipped = 0;
let currentQuestionStatus = "unattempted";

function finalizeCurrentQuestion() {
    if (currentQuestionStatus === "correct") {
        scoreCorrect++;
    } else if (currentQuestionStatus === "wrong") {
        scoreIncorrect++;
    } else if (currentQuestionStatus === "unattempted") {
        scoreSkipped++;
    }
    currentQuestionStatus = "completed";
    updateScoreUI();
}

function updateScoreUI() {
    document.getElementById("count-correct").innerText = scoreCorrect;
    document.getElementById("count-incorrect").innerText = scoreIncorrect;
    document.getElementById("count-skipped").innerText = scoreSkipped;

    const total = scoreCorrect + scoreIncorrect + scoreSkipped;
    if (total > 0) {
        document.getElementById("bar-correct").style.width = (scoreCorrect / total * 100) + "%";
        document.getElementById("bar-incorrect").style.width = (scoreIncorrect / total * 100) + "%";
        document.getElementById("bar-skipped").style.width = (scoreSkipped / total * 100) + "%";
    } else {
        document.getElementById("bar-correct").style.width = "0%";
        document.getElementById("bar-incorrect").style.width = "0%";
        document.getElementById("bar-skipped").style.width = "0%";
    }
}

const level1Types = [
    "include_stdio", "main_func", "printf_cmd", "return_zero", "newline_char"
];

const level2Types = [
    "var_int", "var_float", "var_char", "var_double", "const_var"
];

const level3Types = [
    "scanf_cmd", "address_of", "format_int", "format_float", "format_char"
];

const level4Types = [
    "math_inc", "math_dec", "math_mod", "math_add_assign"
];

const level5Types = [
    "if_cond", "else_cond", "else_if_cond", "switch_cmd", "case_cmd", "break_cmd", "compare_eq", "compare_neq"
];

const level6Types = [
    "for_loop", "while_loop", "do_while"
];

const level7Types = [
    "pointer_decl", "pointer_deref", "pointer_addr"
];

const level8Types = [
    "func_void", "func_return", "func_param"
];

const level9Types = [
    "array_decl", "string_decl", "string_copy", "string_len"
];

const level10Types = [
    "struct_decl", "file_ptr", "fopen_cmd", "fclose_cmd"
];

function changeLevel() {
    const level = document.getElementById("level-select").value;
    const focusContainer = document.getElementById("focus-switch-container");
    const focusToggle = document.getElementById("focus-toggle");

    if (level === "1") {
        focusContainer.style.opacity = "0.3";
        focusToggle.disabled = true;
    } else {
        focusContainer.style.opacity = "1";
        focusToggle.disabled = false;
    }

    // รีเซ็ตคะแนนและเริ่มสุ่มข้อใหม่ของระดับนั้น
    scoreCorrect = 0;
    scoreIncorrect = 0;
    scoreSkipped = 0;
    currentQuestionStatus = "completed"; // ป้องกันการติดสถานะข้าม
    updateScoreUI();
    nextQuestion();
}

function generateRandomQuestion() {
    const level = document.getElementById("level-select").value;
    const isFocus = document.getElementById("focus-toggle").checked;

    let questionTypes = level1Types;
    if (level === "2") {
        if (isFocus) {
            questionTypes = level2Types;
        } else {
            questionTypes = level1Types.concat(level2Types);
        }
    } else if (level === "3") {
        if (isFocus) {
            questionTypes = level3Types;
        } else {
            questionTypes = level1Types.concat(level2Types, level3Types);
        }
    } else if (level === "4") {
        if (isFocus) {
            questionTypes = level4Types;
        } else {
            questionTypes = level1Types.concat(level2Types, level3Types, level4Types);
        }
    } else if (level === "5") {
        if (isFocus) {
            questionTypes = level5Types;
        } else {
            questionTypes = level1Types.concat(level2Types, level3Types, level4Types, level5Types);
        }
    } else if (level === "6") {
        if (isFocus) {
            questionTypes = level6Types;
        } else {
            questionTypes = level1Types.concat(level2Types, level3Types, level4Types, level5Types, level6Types);
        }
    } else if (level === "7") {
        if (isFocus) {
            questionTypes = level7Types;
        } else {
            questionTypes = level1Types.concat(level2Types, level3Types, level4Types, level5Types, level6Types, level7Types);
        }
    } else if (level === "8") {
        if (isFocus) {
            questionTypes = level8Types;
        } else {
            questionTypes = level1Types.concat(level2Types, level3Types, level4Types, level5Types, level6Types, level7Types, level8Types);
        }
    } else if (level === "9") {
        if (isFocus) {
            questionTypes = level9Types;
        } else {
            questionTypes = level1Types.concat(level2Types, level3Types, level4Types, level5Types, level6Types, level7Types, level8Types, level9Types);
        }
    } else if (level === "10") {
        if (isFocus) {
            questionTypes = level10Types;
        } else {
            questionTypes = level1Types.concat(level2Types, level3Types, level4Types, level5Types, level6Types, level7Types, level8Types, level9Types, level10Types);
        }
    }

    let type;
    do {
        type = questionTypes[Math.floor(Math.random() * questionTypes.length)];
    } while (type === lastQuestionType && questionTypes.length > 1);

    lastQuestionType = type;

    let template = "";
    let answer = "";
    let hint = "";

    switch (type) {
        case "include_stdio":
            template = "#include <__________>\n\nint main() {\n  printf(\"Hello\");\n  return 0;\n}";
            answer = "stdio.h";
            hint = "ไลบรารีมาตรฐานสำหรับอินพุตและเอาต์พุต (Standard Input Output)";
            break;
        case "main_func":
            template = "#include <stdio.h>\n\nint __________() {\n  printf(\"Hello\");\n  return 0;\n}";
            answer = "main";
            hint = "ฟังก์ชันหลักที่โปรแกรมภาษา C จะเริ่มทำงาน";
            break;
        case "printf_cmd":
            template = "#include <stdio.h>\n\nint main() {\n  __________(\"Hello World!\\n\");\n  return 0;\n}";
            answer = "printf";
            hint = "คำสั่งสำหรับแสดงผลข้อความออกทางหน้าจอ";
            break;
        case "return_zero":
            template = "#include <stdio.h>\n\nint main() {\n  printf(\"Hello World!\\n\");\n  __________ 0;\n}";
            answer = "return";
            hint = "คำสั่งส่งค่ากลับออกจากฟังก์ชัน เพื่อบอกว่าโปรแกรมทำงานเสร็จสมบูรณ์";
            break;
        case "newline_char":
            template = "int main() {\n  printf(\"Line 1__________Line 2\");\n  return 0;\n}";
            answer = "\\n";
            hint = "สัญลักษณ์พิเศษสำหรับขึ้นบรรทัดใหม่ (Newline)";
            break;

        case "var_int":
            template = "__________ age = 20;\n\nint main() {\n  printf(\"%d\", age);\n  return 0;\n}";
            answer = "int";
            hint = "ชนิดข้อมูลสำหรับเก็บตัวเลขจำนวนเต็ม";
            break;
        case "var_float":
            template = "__________ pi = 3.14f;\n\nint main() {\n  printf(\"%f\", pi);\n  return 0;\n}";
            answer = "float";
            hint = "ชนิดข้อมูลสำหรับเก็บตัวเลขทศนิยม";
            break;
        case "var_char":
            template = "__________ grade = 'A';\n\nint main() {\n  printf(\"%c\", grade);\n  return 0;\n}";
            answer = "char";
            hint = "ชนิดข้อมูลสำหรับเก็บตัวอักษร 1 ตัว";
            break;
        case "var_double":
            template = "__________ distance = 12345.6789;\n\nint main() {\n  printf(\"%lf\", distance);\n  return 0;\n}";
            answer = "double";
            hint = "ชนิดข้อมูลสำหรับเก็บทศนิยมความละเอียดสูง (Double precision)";
            break;
        case "const_var":
            template = "__________ int MAX_SIZE = 100;\n\nint main() {\n  return 0;\n}";
            answer = "const";
            hint = "คีย์เวิร์ดสำหรับประกาศตัวแปรค่าคงที่ ที่เปลี่ยนแปลงค่าไม่ได้";
            break;

        case "scanf_cmd":
            template = "int main() {\n  int age;\n  __________(\"%d\", &age);\n  return 0;\n}";
            answer = "scanf";
            hint = "คำสั่งรับค่าข้อมูลจากคีย์บอร์ด";
            break;
        case "address_of":
            template = "int main() {\n  int score;\n  scanf(\"%d\", __________score);\n  return 0;\n}";
            answer = "&";
            hint = "เครื่องหมายบอกตำแหน่งที่อยู่หน่วยความจำของตัวแปร (Address of)";
            break;
        case "format_int":
            template = "int main() {\n  int number = 10;\n  printf(\"Number is __________\", number);\n  return 0;\n}";
            answer = "%d";
            hint = "Format specifier สำหรับแสดงผลตัวเลขจำนวนเต็ม";
            break;
        case "format_float":
            template = "int main() {\n  float height = 1.75;\n  printf(\"Height is __________\", height);\n  return 0;\n}";
            answer = "%f";
            hint = "Format specifier สำหรับแสดงผลตัวเลขทศนิยม (float)";
            break;
        case "format_char":
            template = "int main() {\n  char letter = 'X';\n  printf(\"Letter is __________\", letter);\n  return 0;\n}";
            answer = "%c";
            hint = "Format specifier สำหรับแสดงผลตัวอักษร 1 ตัว";
            break;

        case "math_inc":
            template = "int main() {\n  int count = 5;\n  count__________; // count จะกลายเป็น 6\n  return 0;\n}";
            answer = "++";
            hint = "เครื่องหมายเพิ่มค่าตัวแปรขึ้นทีละ 1 (Increment)";
            break;
        case "math_dec":
            template = "int main() {\n  int hp = 10;\n  hp__________; // hp จะกลายเป็น 9\n  return 0;\n}";
            answer = "--";
            hint = "เครื่องหมายลดค่าตัวแปรลงทีละ 1 (Decrement)";
            break;
        case "math_mod":
            template = "int main() {\n  int remain = 10 __________ 3; // หารเอาเศษ ได้ 1\n  return 0;\n}";
            answer = "%";
            hint = "เครื่องหมายหารเอาเศษ (Modulo)";
            break;
        case "math_add_assign":
            template = "int main() {\n  int score = 10;\n  score __________ 5; // score = score + 5\n  return 0;\n}";
            answer = "+=";
            hint = "เครื่องหมายบวกเพิ่มจากค่าเดิม";
            break;

        case "compare_eq":
            template = "int main() {\n  int a = 5;\n  if (a __________ 5) {\n    printf(\"Equal\");\n  }\n  return 0;\n}";
            answer = "==";
            hint = "เครื่องหมายเปรียบเทียบความเท่ากัน (ใช้ 2 ตัวติดกัน)";
            break;
        case "compare_neq":
            template = "int main() {\n  int a = 5;\n  if (a __________ 0) {\n    printf(\"Not zero\");\n  }\n  return 0;\n}";
            answer = "!=";
            hint = "เครื่องหมายเปรียบเทียบความไม่เท่ากัน";
            break;
        case "if_cond":
            template = "int main() {\n  __________ (score > 50) {\n    printf(\"Pass\");\n  }\n  return 0;\n}";
            answer = "if";
            hint = "คำสั่งเช็คเงื่อนไข (ถ้า...)";
            break;
        case "else_cond":
            template = "int main() {\n  if (score > 50) {\n    printf(\"Pass\");\n  } __________ {\n    printf(\"Fail\");\n  }\n  return 0;\n}";
            answer = "else";
            hint = "คำสั่งทำงานเมื่อเงื่อนไขแรกไม่เป็นจริง (มิฉะนั้น...)";
            break;
        case "else_if_cond":
            template = "int main() {\n  if (score >= 80) {\n    printf(\"A\");\n  } __________ (score >= 70) {\n    printf(\"B\");\n  }\n  return 0;\n}";
            answer = "else if";
            hint = "คำสั่งเช็คเงื่อนไขถัดไป (เว้นวรรค 1 ช่อง)";
            break;
        case "switch_cmd":
            template = "int main() {\n  int menu = 1;\n  __________(menu) {\n    case 1:\n      printf(\"Menu 1\");\n      break;\n  }\n  return 0;\n}";
            answer = "switch";
            hint = "คำสั่งเลือกทำงานตามค่าของตัวแปร (ใช้คู่กับ case)";
            break;
        case "case_cmd":
            template = "int main() {\n  int menu = 1;\n  switch(menu) {\n    __________ 1:\n      printf(\"Menu 1\");\n      break;\n  }\n  return 0;\n}";
            answer = "case";
            hint = "ระบุเงื่อนไขในคำสั่ง switch";
            break;
        case "break_cmd":
            template = "int main() {\n  int menu = 1;\n  switch(menu) {\n    case 1:\n      printf(\"Menu 1\");\n      __________;\n  }\n  return 0;\n}";
            answer = "break";
            hint = "คำสั่งหยุดและกระโดดออกจาก switch หรือ loop";
            break;

        case "for_loop":
            template = "int main() {\n  __________ (int i = 0; i < 5; i++) {\n    printf(\"%d\", i);\n  }\n  return 0;\n}";
            answer = "for";
            hint = "คำสั่งวนลูปแบบรู้จำนวนรอบที่แน่นอน";
            break;
        case "while_loop":
            template = "int main() {\n  int i = 0;\n  __________ (i < 5) {\n    printf(\"%d\", i);\n    i++;\n  }\n  return 0;\n}";
            answer = "while";
            hint = "คำสั่งวนลูปตราบใดที่เงื่อนไขยังเป็นจริง";
            break;
        case "do_while":
            template = "int main() {\n  int i = 0;\n  __________ {\n    printf(\"%d\", i);\n    i++;\n  } while (i < 5);\n  return 0;\n}";
            answer = "do";
            hint = "คำสั่งวนลูปที่จะทำงานอย่างน้อย 1 รอบเสมอ ก่อนเช็คเงื่อนไข (คู่กับ while)";
            break;

        case "pointer_decl":
            template = "int main() {\n  int num = 10;\n  int __________ptr = &num;\n  return 0;\n}";
            answer = "*";
            hint = "เครื่องหมายบอกว่าตัวแปรนี้เป็น Pointer";
            break;
        case "pointer_deref":
            template = "int main() {\n  int num = 10;\n  int *ptr = &num;\n  printf(\"%d\", __________ptr); // แสดงค่า 10\n  return 0;\n}";
            answer = "*";
            hint = "เครื่องหมาย Dereference ใช้เข้าถึงค่าที่ Pointer ชี้ไป";
            break;
        case "pointer_addr":
            template = "int main() {\n  int num = 10;\n  int *ptr = __________num;\n  return 0;\n}";
            answer = "&";
            hint = "เครื่องหมายขอ Address ของตัวแปรเพื่อเก็บใน Pointer";
            break;

        case "func_void":
            template = "__________ sayHello() {\n  printf(\"Hello\");\n}\n\nint main() {\n  sayHello();\n  return 0;\n}";
            answer = "void";
            hint = "ชนิดฟังก์ชันที่ไม่ต้องการส่งค่ากลับ";
            break;
        case "func_return":
            template = "int getSquare(int x) {\n  __________ x * x;\n}\n\nint main() {\n  int ans = getSquare(5);\n  return 0;\n}";
            answer = "return";
            hint = "คำสั่งส่งค่าผลลัพธ์กลับออกจากฟังก์ชัน";
            break;
        case "func_param":
            template = "void printAge(__________ age) {\n  printf(\"Age: %d\", age);\n}\n\nint main() {\n  printAge(25);\n  return 0;\n}";
            answer = "int";
            hint = "ชนิดของพารามิเตอร์ที่เป็นตัวเลขจำนวนเต็ม";
            break;

        case "array_decl":
            template = "int main() {\n  int numbers__________ = {1, 2, 3, 4, 5};\n  return 0;\n}";
            answer = "[5]";
            hint = "ระบุขนาดของอาร์เรย์ (ใส่วงเล็บเหลี่ยมและเลข 5)";
            break;
        case "string_decl":
            template = "int main() {\n  char name[20] = \"__________\";\n  return 0;\n}";
            answer = "John";
            hint = "พิมพ์ชื่อ John (ตัวอย่างสตริง)";
            break;
        case "string_copy":
            template = "#include <string.h>\n\nint main() {\n  char str[20];\n  __________(str, \"Hello\"); // คัดลอกสตริง\n  return 0;\n}";
            answer = "strcpy";
            hint = "ฟังก์ชันคัดลอกสตริง (อยู่ใน string.h)";
            break;
        case "string_len":
            template = "#include <string.h>\n\nint main() {\n  char str[] = \"Hello\";\n  int len = __________(str); // หาความยาว\n  return 0;\n}";
            answer = "strlen";
            hint = "ฟังก์ชันหาความยาวของสตริง";
            break;

        case "struct_decl":
            template = "__________ Student {\n  int id;\n  float gpa;\n};\n\nint main() {\n  return 0;\n}";
            answer = "struct";
            hint = "คีย์เวิร์ดสำหรับสร้างโครงสร้างข้อมูล (Structure)";
            break;
        case "file_ptr":
            template = "int main() {\n  __________ *fp;\n  fp = fopen(\"data.txt\", \"r\");\n  return 0;\n}";
            answer = "FILE";
            hint = "ชนิดข้อมูล Pointer สำหรับจัดการไฟล์ (พิมพ์ใหญ่ทั้งหมด)";
            break;
        case "fopen_cmd":
            template = "int main() {\n  FILE *fp;\n  fp = __________(\"data.txt\", \"r\");\n  return 0;\n}";
            answer = "fopen";
            hint = "ฟังก์ชันสำหรับเปิดไฟล์";
            break;
        case "fclose_cmd":
            template = "int main() {\n  FILE *fp = fopen(\"data.txt\", \"r\");\n  __________(fp);\n  return 0;\n}";
            answer = "fclose";
            hint = "ฟังก์ชันสำหรับปิดไฟล์";
            break;
    }
    return { template, answer, hint };
}

function nextQuestion() {
    if (currentAnswer !== "") {
        if (currentQuestionStatus !== "completed") {
            finalizeCurrentQuestion();
        }
    }
    currentQuestionStatus = "unattempted";

    // สุ่มโจทย์ใหม่ไม่จำกัด
    const q = generateRandomQuestion();
    currentAnswer = q.answer;
    currentHint = q.hint;

    // แทนที่ช่องว่างด้วย Input Field
    const htmlCode = q.template.replace("__________", "<input type='text' id='userInput' autocomplete='off' onkeypress='handleEnter(event)'>");

    document.getElementById("code-display").innerHTML = htmlCode;
    document.getElementById("feedback").innerHTML = `<span style="color: #888; font-size: 0.9rem;">คำใบ้: ${currentHint}</span>`;

    const mainBtn = document.getElementById("main-action-btn");
    if (mainBtn) {
        mainBtn.innerHTML = '<i class="fas fa-check"></i> ตรวจคำตอบ';
        mainBtn.className = 'container-fluid btn btn-primary btn-lg';
    }

    // Auto Focus ที่ช่องเติมคำ
    setTimeout(() => {
        const inputEl = document.getElementById("userInput");
        if (inputEl) inputEl.focus();
    }, 100);
    syncStateToRemote();
}

function checkAnswer() {
    if (currentQuestionStatus === "completed") return;

    const userInputEl = document.getElementById("userInput");
    const userVal = userInputEl.value.trim();
    const feedbackBox = document.getElementById("feedback");
    const mainBtn = document.getElementById("main-action-btn");

    if (userVal === currentAnswer) {
        feedbackBox.innerHTML = "<span class='correct'>✅ โคตรเป๊ะ! ไปลุยข้อต่อไปเลย</span>";
        currentQuestionStatus = "correct";
        finalizeCurrentQuestion();
        userInputEl.disabled = true;
        if (mainBtn) {
            mainBtn.innerHTML = '<i class="fas fa-forward"></i> ข้อต่อไป';
            mainBtn.className = 'container-fluid btn btn-success btn-lg';
        }
    } else {
        currentQuestionStatus = "wrong";
        finalizeCurrentQuestion();
        userInputEl.disabled = true;

        // แจ้งเตือนและเฉลยคำตอบที่ถูกต้อง
        if (userVal.toLowerCase() === currentAnswer.toLowerCase()) {
            feedbackBox.innerHTML = `<span class='incorrect'>❌ ผิดตัวพิมพ์เล็ก-ใหญ่! คำตอบที่ถูกต้องคือ <strong>${currentAnswer}</strong></span>`;
        } else {
            feedbackBox.innerHTML = `<span class='incorrect'>❌ ผิดจ้า! คำตอบที่ถูกต้องคือ <strong>${currentAnswer}</strong></span>`;
        }
        if (mainBtn) {
            mainBtn.innerHTML = '<i class="fas fa-forward"></i> ข้อต่อไป';
            mainBtn.className = 'container-fluid btn btn-danger btn-lg';
        }
    }
    syncStateToRemote();
}

function handleMainAction() {
    if (currentQuestionStatus === "unattempted") {
        checkAnswer();
    } else {
        nextQuestion();
    }
}

function handleEnter(e) {
    if (e.key === 'Enter') checkAnswer();
}

function restartGame() {
    Swal.fire({
        title: 'เริ่มใหม่?',
        text: "คะแนนปัจจุบันจะถูกรีเซ็ตทั้งหมด!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff9800',
        cancelButtonColor: '#555',
        confirmButtonText: 'ใช่, เริ่มเลย!',
        cancelButtonText: 'ยกเลิก',
        background: '#2d2d2d',
        color: '#d4d4d4'
    }).then((result) => {
        if (result.isConfirmed) {
            scoreCorrect = 0;
            scoreIncorrect = 0;
            scoreSkipped = 0;
            currentQuestionStatus = "completed";
            updateScoreUI();
            nextQuestion();
            syncStateToRemote();
        }
    });
}

// เริ่มเกมข้อแรกทันทีที่โหลดเว็บ
nextQuestion();

// ==========================================
// Remote Control & Live Teaching Sync
// ==========================================
let isTeachingMode = false;
let eventSource = null;

function syncStateToRemote() {
    if (!isTeachingMode || !window.location.protocol.startsWith("http")) return;

    const codeDisplayEl = document.getElementById("code-display");
    const mainBtn = document.getElementById("main-action-btn");
    const levelSelect = document.getElementById("level-select");

    const state = {
        questionText: codeDisplayEl ? codeDisplayEl.innerText.trim() : "",
        correctAnswer: currentAnswer,
        hint: currentHint,
        scoreCorrect: scoreCorrect,
        scoreIncorrect: scoreIncorrect,
        scoreSkipped: scoreSkipped,
        totalQuestions: scoreCorrect + scoreIncorrect + scoreSkipped,
        status: currentQuestionStatus,
        mainBtnText: mainBtn ? mainBtn.innerText.trim() : "ตรวจคำตอบ",
        level: levelSelect ? levelSelect.value : "1",
        buttons: [
            { id: "main-action-btn", text: mainBtn ? mainBtn.innerText.trim() : "ตรวจคำตอบ", className: mainBtn ? mainBtn.className : "btn btn-primary btn-lg" },
            { id: "reveal-c-btn", text: `เฉลย (${currentAnswer})`, className: "btn btn-outline-success btn-lg" }
        ]
    };

    fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
    }).catch(() => {});
}

function handleRemoteAction(data) {
    if (data.action === "request_state") {
        syncStateToRemote();
        return;
    }

    if (data.action === "click") {
        if (data.target === "reveal-c-btn") {
            const inputEl = document.getElementById("userInput");
            if (inputEl) {
                inputEl.value = currentAnswer;
            }
            handleMainAction();
        } else {
            const el = document.getElementById(data.target);
            if (el) {
                el.classList.add("remote-click-active");
                setTimeout(() => el.classList.remove("remote-click-active"), 250);
                el.click();
            }
        }
    } else if (data.action === "submit_answer") {
        const inputEl = document.getElementById("userInput");
        if (inputEl) {
            inputEl.value = data.value;
        }
        handleMainAction();
    } else if (data.action === "set_level") {
        const levelSelect = document.getElementById("level-select");
        if (levelSelect && data.value && levelSelect.value !== data.value) {
            levelSelect.value = data.value;
            changeLevel();
        }
    }
}

function updateClientCountUI(count) {
    const remoteCountBadge = document.getElementById("remote-badge-count");
    const remotePillText = document.getElementById("remote-pill-text");
    const modalStatusText = document.getElementById("modal-status-text");
    const modalStatusDot = document.getElementById("modal-status-dot");

    const remoteDevices = Math.max(0, count - 1);

    if (remoteCountBadge) {
        remoteCountBadge.textContent = remoteDevices;
        remoteCountBadge.className = remoteDevices > 0 ? "badge bg-success ms-1" : "badge bg-secondary ms-1";
    }

    if (remotePillText) {
        remotePillText.textContent = remoteDevices > 0 ? `รีโมท: ${remoteDevices} เครื่อง 🟢` : "รีโมทมือถือ (Remote)";
    }

    if (modalStatusText) {
        if (remoteDevices > 0) {
            modalStatusText.textContent = `เชื่อมต่อแล้ว ${remoteDevices} เครื่อง (พร้อมควบคุมระยะไกล)`;
            if (modalStatusDot) modalStatusDot.className = "fas fa-circle text-success me-2 fs-6";
        } else {
            modalStatusText.textContent = "ยังไม่มีเครื่องเชื่อมต่อ (รอสแกน QR Code)";
            if (modalStatusDot) modalStatusDot.className = "fas fa-circle text-muted me-2 fs-6";
        }
    }
}

function initSSE() {
    if (!isTeachingMode || !window.location.protocol.startsWith("http")) return;
    if (eventSource) return;

    eventSource = new EventSource("/api/events");

    eventSource.onmessage = (e) => {
        try {
            const data = JSON.parse(e.data);
            if (data.type === "action") {
                handleRemoteAction(data);
            } else if (data.type === "client_count") {
                updateClientCountUI(data.count);
            }
        } catch (err) {
            console.error("SSE parse error:", err);
        }
    };
}

function populateServerInfo(info) {
    const urlTs = document.getElementById("url-tailscale");
    const urlWifi = document.getElementById("url-wifi");
    const qrTs = document.getElementById("qr-img-tailscale");
    const qrWifi = document.getElementById("qr-img-wifi");

    if (urlTs && info.tailscale_url) {
        urlTs.value = info.tailscale_url;
    } else if (urlTs) {
        urlTs.value = "ไม่พบ Tailscale IP (โปรดตรวจสอบการเปิด Tailscale)";
    }

    if (urlWifi && info.wifi_url) {
        urlWifi.value = info.wifi_url;
    } else if (urlWifi) {
        urlWifi.value = info.local_url + "/remote";
    }

    if (qrTs && info.tailscale_url) {
        qrTs.src = "/api/qrcode?target=tailscale";
        qrTs.style.display = "block";
    }
    if (qrWifi && info.wifi_url) {
        qrWifi.src = "/api/qrcode?target=wifi";
        qrWifi.style.display = "block";
    }

    setupCopyButtons();
}

function enableTeachingMode(info) {
    isTeachingMode = true;

    const teacherBar = document.getElementById("teacher-control-bar");
    if (teacherBar) {
        teacherBar.classList.remove("d-none");
        teacherBar.classList.add("d-flex");
    }

    populateServerInfo(info);
    initSSE();
    syncStateToRemote();
}

function setupCopyButtons() {
    const btnTs = document.getElementById("btn-copy-tailscale");
    const btnWifi = document.getElementById("btn-copy-wifi");

    if (btnTs) {
        btnTs.onclick = () => {
            const input = document.getElementById("url-tailscale");
            if (input && input.value) {
                navigator.clipboard.writeText(input.value);
                btnTs.innerHTML = '<i class="fas fa-check text-success"></i>';
                setTimeout(() => (btnTs.innerHTML = '<i class="fas fa-copy"></i>'), 1500);
            }
        };
    }

    if (btnWifi) {
        btnWifi.onclick = () => {
            const input = document.getElementById("url-wifi");
            if (input && input.value) {
                navigator.clipboard.writeText(input.value);
                btnWifi.innerHTML = '<i class="fas fa-check text-success"></i>';
                setTimeout(() => (btnWifi.innerHTML = '<i class="fas fa-copy"></i>'), 1500);
            }
        };
    }
}

// Fullscreen button toggle
const btnFullscreen = document.getElementById("btn-fullscreen");
if (btnFullscreen) {
    btnFullscreen.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
            btnFullscreen.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
            document.exitFullscreen().catch(() => {});
            btnFullscreen.innerHTML = '<i class="fas fa-expand"></i>';
        }
    });

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
            btnFullscreen.innerHTML = '<i class="fas fa-expand"></i>';
        } else {
            btnFullscreen.innerHTML = '<i class="fas fa-compress"></i>';
        }
    });
}

// ==========================================
// Auto-detect Python Server (run_server.py)
// ถ้าไม่ได้กด run ผ่าน .py จะคงสถานะหน้าเว็บแบบเดิม
// ==========================================
function detectPythonServer() {
    const hostname = window.location.hostname;
    const isStaticHost =
        window.location.protocol === "file:" ||
        hostname.endsWith("github.io") ||
        hostname.includes("github.io");

    if (isStaticHost) {
        return;
    }

    fetch("/api/info", { cache: "no-store" })
        .then((res) => {
            if (res.ok && res.headers.get("content-type")?.includes("json")) {
                return res.json();
            }
            throw new Error("Not run_server.py");
        })
        .then((info) => {
            if (info && info.port) {
                enableTeachingMode(info);
            }
        })
        .catch(() => {});
}

detectPythonServer();

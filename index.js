"use strict";
const $input = document.querySelector("input");
document.querySelectorAll("button.numkey").forEach(elem => {
    const n = elem.innerText;
    elem.onclick = event => $input.value = $input.value + n;
});
const buffer = [];
const evaluate = buffer => {
    // note(jrm) Since pop() removes the _last_ element of an array,
    // we use the following order instead of starting with the first operand.
    const secondOperand = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;
    if (operator === "add") {
        return firstOperand + secondOperand;
    }
    else if (operator === "minus") {
        return firstOperand - secondOperand;
    }
    else if (operator === "times") {
        return firstOperand * secondOperand;
    }
    else if (operator === "divide") {
        return firstOperand / secondOperand;
    }
    else if (operator === "mod") {
        return firstOperand % secondOperand;
    }
};
const opCallback = opname => event => {
    if (buffer && buffer.length) {
        buffer.push({ type: "value", value: parseInt($input.value, 10) });
        const result = evaluate(buffer);
        buffer.push({ type: "value", value: result });
        buffer.push({ type: "op", value: opname });
        $input.value = "";
    }
    else {
        buffer.push({ type: "value", value: parseInt($input.value, 10) });
        buffer.push({ type: "op", value: opname });
        $input.value = "";
    }
};
for (const opname of ["add", "minus", "times", "divide", "mod"]) {
    document.querySelector(`button.opkey[op=${opname}]`).onclick =
        opCallback(opname);
}
document.querySelector("button.eqkey").onclick =
    event => {
   
        buffer.push({ type: "value", value: parseInt($input.value, 10) });
        $input.value = evaluate(buffer).toString();
        console.log('aaaa');
    };
document.querySelector("button.opkey[op=clear]").onclick =
    event => {
        $input.value = "";
        while (buffer.length)
            buffer.pop();
    };
document.querySelector("button.opkey[op=negate]").onclick =
    event => $input.value = -parseInt($input.value, 10);


    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
speech.text = msg;
speech.volume = 1;
speech.rate = 1;
speech.pitch = 1;                

window.speechSynthesis.speak(speech);
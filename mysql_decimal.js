const scaleInput = document.getElementById('scale');
const precisionInput = document.getElementById('precision');

const minElement = document.getElementById('output_min');
const maxElement = document.getElementById('output_max');
const mysqlElement = document.getElementById('output_mysql');
const doctrineElement = document.getElementById('output_doctrine');

const example = (new Intl.NumberFormat()).format('1000.1');
const thousandsSeparator = example[1];
const decimalSeparator = example[5];

function update() {
    const precision = parseInt(precisionInput.value);
    const scale = parseInt(scaleInput.value);

    let minInteger = addThousandsSeparator('9'.repeat(precision - scale));
    let minDecimal = '9'.repeat(scale);

    let maxInteger = addThousandsSeparator('9'.repeat(precision - scale));
    let maxDecimal = '9'.repeat(scale);

    // If precision is equal to scale, then integer value is 0
    if (precision === scale) {
        minInteger = 0;
        maxInteger = 0;
    }

    let min = '-' + minInteger;
    if (scale > 0) {
        min += decimalSeparator + minDecimal;
    }

    minElement.textContent = `${min}`;

    let max = maxInteger;
    if (scale > 0) {
        max += decimalSeparator + maxDecimal;
    }

    maxElement.textContent = `${max}`;

    mysqlElement.textContent = `DECIMAL(${precision}, ${scale})`;
    doctrineElement.textContent = `#[ORM\\Column(type: 'decimal', precision: ${precision}, scale: ${scale})]`;
}

function addThousandsSeparator(value) {
    const splits = [];
    while (value.length) {
        splits.push(value.slice(-3));
        value = value.slice(0, -3);
    }

    return splits.reverse().join(thousandsSeparator);
}

precisionInput.addEventListener('input', e => {
    const precisionValue = parseInt(precisionInput.value, 10);
    const scaleValue = parseInt(scaleInput.value, 10);

    if (scaleValue > precisionValue) {
        scaleInput.value = precisionValue;
    }

    update();
});


scaleInput.addEventListener('input', e => {
    const precisionValue = parseInt(precisionInput.value, 10);
    const scaleValue = parseInt(scaleInput.value, 10);

    if (scaleValue > precisionValue) {
        precisionInput.value = scaleValue;
    }

    update();
});

update();

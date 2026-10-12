// Ambil elemen layar
const display = document.getElementById('display');

// Menambahkan angka atau operator ke layar
function appendValue(val) {
    if (display.value === 'Error') {
        display.value = '';
    }
    display.value += val;
}

// Menghapus seluruh isi layar (Clear)
function clearDisplay() {
    display.value = '';
}

// Menghapus satu karakter terakhir (Delete)
function deleteLast() {
    if (display.value === 'Error') {
        display.value = '';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

// Menghitung hasil perhitungan
function calculate() {
    try {
        if (!display.value) return;

        // Mengubah % menjadi operasi bagi 100
        let expression = display.value.replace(/%/g, '/100');

        // Menghitung hasil ekspresi matematika
        let result = Function('return ' + expression)();

        // Rapikan jika hasil berupa angka desimal panjang
        if (!Number.isInteger(result) && result !== undefined) {
            result = parseFloat(result.toFixed(8));
        }

        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

// Mendukung ketikan keyboard fisik
document.addEventListener('keydown', function(event) {
    const key = event.key;

    if ((key >= '0' && key <= '9') || key === '.') {
        appendValue(key);
    } else if (key === '+') {
        appendValue('+');
    } else if (key === '-') {
        appendValue('-');
    } else if (key === '*') {
        appendValue('*');
    } else if (key === '/') {
        event.preventDefault();
        appendValue('/');
    } else if (key === '%') {
        appendValue('%');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
});

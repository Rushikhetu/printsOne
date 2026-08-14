const uploadInput = document.getElementById('uploadImage');
const preview = document.getElementById('coverPreview');

uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
            preview.src = event.target.result;
        };

        reader.readAsDataURL(file);
    }
});
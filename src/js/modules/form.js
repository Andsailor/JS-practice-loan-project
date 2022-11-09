export default class Form {
    constructor(mailInput) {
        this.forms = document.querySelectorAll('form');
        this.mails = document.querySelectorAll(mailInput);
        this.path = 'assets/question.php';
        this.message = {
            loading: `<img style="height:30px;width:30px;margin-left:82px;" src="assets/icons/spinner.gif" alt="spinner">`,
            succes: `<div>Thank You for request!<br>Our manager will contact you soon.</div>`,
            error:  `<div>Something went wrong...</div>`
        };
    } 
    
    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
            
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };

        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');

            if (def.length >= val.length) {
                val = def;
            }

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });

            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }

        let inputs = document.querySelectorAll('[name="phone"]');

        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    mailInput() {
        document.querySelectorAll('[type="email"]').forEach(mail => {
            mail.addEventListener('keypress', function(e) {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
    }

    async sendRequest(data) {
        let respond = await fetch(this.path, {
            method: 'POST',
            body: data
        });

        return await respond.text();
    }

    initForm() {
        this.mailInput();
        this.initMask();

        this.forms.forEach(form => {       
            form.addEventListener('submit', (e) => {
                let status = document.createElement('div');
                status.classList.add('animated', 'fadeIn');
                status.style.cssText = 'margin-top:20px;';
                if (form == this.forms[0]) {
                    status.style.color = 'white';
                } else {
                    status.style.color = 'black';
                }
                status.innerHTML = this.message.loading;
                form.parentNode.appendChild(status);
                
                e.preventDefault();

                let formData = new FormData(form);
                this.sendRequest(formData)
                .then(result => {
                    console.log(result);
                    status.innerHTML = this.message.succes;
                })
                .catch(error => {
                    console.log(error);
                    status.innerHTML = this.message.error;
                })
                .finally(() => {
                    document.querySelectorAll('input').forEach(input => {
                        input.value = '';
                    });
                    setTimeout(function() {
                        status.remove();
                    }, 3000);
                });
            });
        });
    }
}
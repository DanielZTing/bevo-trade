fetch('http://localhost:3000/list').then(response => response.json()).then(requests => {
    for (request of requests) {
        let row = document.getElementById('table').insertRow();
        row.insertCell().appendChild(document.createTextNode(request.time.replace('T', ' at ')));
        row.insertCell().appendChild(document.createTextNode(request.place));
        row.insertCell().appendChild(document.createTextNode(request.description));
        row.insertCell().appendChild(document.createTextNode('$' + Number(request.bid).toFixed(2)));
        let input = document.createElement('input');
        input.type = 'number';
        input.min = 0;
        input.step = .01;
        input.classList.add('form-control');
        input.classList.add('bid');
        input.id = request.id;
        input.addEventListener('keyup', ({ key }) => {
            if (key == 'Enter') {
                fetch('http://localhost:3000/bid', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: input.id, bid: input.value })
                }).then(() => window.location.reload());
            }
        });
        row.insertCell().appendChild(input);
    }
});

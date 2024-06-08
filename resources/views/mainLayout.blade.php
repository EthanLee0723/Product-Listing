<head>
    <input id="csrfToken" value={{ CSRF_TOKEN() }} hidden/>
</head>
@yield("content")
<script src="{{ asset('js/app.js') }}" defer></script>
<script>
    const _token = document.getElementById("csrfToken").value;
    let globalData = {
        isAdmin: {!! Session::get("isAdmin")?Session::get("isAdmin"):"false" !!}
    }
</script>

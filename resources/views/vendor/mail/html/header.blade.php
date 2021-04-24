<tr>
<td class="header">
<a href="{{ $url }}" style="display: inline-block;">
@if (trim($slot) === 'Laravel')
<img src="{{ asset('img/logo_mini.svg') }}" class="logo" alt="Логотип">
@else
<div class="head">
<img src="{{ asset('img/logo_mini.svg') }}" class="logo" alt="Логотип">
{{ $slot }}
</div>
@endif
</a>
</td>
</tr>

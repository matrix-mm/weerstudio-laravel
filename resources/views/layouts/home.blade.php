<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>WeeR</title>

        <!-- Fonts -->
    
        <!-- Styles -->
        

        
            <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/custom.css')}}">
        
    </head>
   
        
    <div class="container content1">
        <div class="main">
            <div class="instruction">
                <a href="/">
            <h1><img src="{{ asset('assets/img/logo/weerlogo.png') }}"></h1>
                </a>
            </div>
            <div class="btn">
                <button id="button" ><a href="/works">WORKS</a></button>
            </div>
            <div class="btn">
                <button id="button"><a href="/studio">STUDIO</a></button>
            </div>
        </div>
    </div>
    
</html>

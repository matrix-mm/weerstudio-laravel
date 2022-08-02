<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8" />
    <title>WeeR</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="-token" content="{{ csrf_token() }}" />

    <style>
        .tk-source-han-sans-simplified-c {
            font-family: "source-han-sans-simplified-c", sans-serif;
        }
    </style>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link href='assets/css/mapbox-gl.css' rel='stylesheet' />
    <link rel='stylesheet' type='text/css' href='assets/css/main.css' />
    
<!-- Style CSS -->
<!--<link rel="stylesheet" href="assets/css/style.css">
    
Only for demo purpose - no need to add.-->
<!--<link rel="stylesheet" type="text/css" href="assets/css/demo.css" />!-->
    <script>
        (function(i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function() {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-18300174-3', 'auto');
        ga('send', 'pageview');
    </script>
</head>

<body>
    <div id='site'>
        <header>
            <div class="logowrap"><a href="/" class="logo logo-en">weer</a></div>
            <nav id="mainnavi" class="" style="top: 150px;padding-top: 50px;">
                <ul class="" style="bottom: 125px;">
                    <li class="{{ 'works' == request()->path() ? 'selected' : '' }}"><a href="/works" data-subnavi="1"
                            class="local">Works</a></li>
                    <li class="{{ 'studio' == request()->path() ? 'selected' : '' }}"><a href="/studio" data-subnavi="2"
                            class="local">Studio</a></li>

                    <li class="mkbgr"></li>
                </ul>
                <ul class="subnavi subnavi_1 selected">
                    <li class=""><a href="/works/selected" data-subsubnavi="1" class="local">Selected</a>
                    </li>
                    <li><a href="/works/architecture" data-subsubnavi="2" class="local">Architecture</a></li>
                    <li><a href="/works/interiors" data-subsubnavi="3" class="local">Interiors</a></li>
                    <li><a href="/works/products" data-subsubnavi="4" class="local">Products</a></li>
                    <li><a href="/works/graphics" data-subsubnavi="5" class="local">Graphics</a></li>
                    <li><a href="/works/branding" data-subsubnavi="6" class="local">Branding</a></li>
                    <li><a href="/works/installations-exhibitions" data-subsubnavi="7" class="local">Installations
                            &amp; Exhibitions</a></li>
                    <li><a href="/works/index" data-subsubnavi="8" class="local">Index</a></li>
                    <li><a href="/works/map" data-subsubnavi="9" class="local">Map</a></li>
                </ul>
                <ul class="subnavi subnavi_2">
                    <li><a href="/about" data-subsubnavi="10" class="local">About</a></li>
                    <li><a href="/people" data-subsubnavi="11" class="local">People</a></li>
                    <li><a href="/news" data-subsubnavi="12" class="local">News</a></li>
                    <li><a href="/press" data-subsubnavi="13" class="local">Press</a></li>
                    <li><a href="/awards" data-subsubnavi="14" class="local">Awards</a></li>
                    <li><a href="/contact" data-subsubnavi="15" class="local">Contact</a></li>
                </ul>
                <ul class="subsubnavi subsubnavi_2">
                    <li><a href="/works/architecture" data-subsubnavi="2" class="local">All</a></li>
                    <li><a href="/works/residential" data-subsubnavi="2" class="local">Residential</a></li>
                    <li><a href="/works/civic-cultural" data-subsubnavi="2" class="local">Civic &amp; Cultural</a>
                    </li>
                    <li><a href="#" data-subsubnavi="2" class="local">Hospitality</a></li>
                    <li><a href="#" data-subsubnavi="2" class="local">Masterplan &amp;
                            Mixed-use</a></li>
                    <li><a href="#" data-subsubnavi="2" class="local">Office &amp; Retail</a>
                    </li>
                    <li><a href="#" data-subsubnavi="2" class="local">Renovation</a></li>
                    <li><a href="#" data-subsubnavi="2" class="local">Research</a></li>
                </ul>
                <ul class="subsubnavi subsubnavi_3">
                    <li><a href="/en/works/interiors" data-subsubnavi="3" class="local">All</a></li>
                    <li><a href="/en/works/hospitality_2" data-subsubnavi="3" class="local">Hospitality</a></li>
                    <li><a href="/en/works/civic-cultural_2" data-subsubnavi="3" class="local">Civic &amp;
                            Cultural</a></li>
                    <li><a href="/en/works/masterplan-mixeduse" data-subsubnavi="3" class="local">Masterplan &amp;
                            Mixed-use</a></li>
                    <li><a href="/en/works/office-retail_2" data-subsubnavi="3" class="local">Office &amp;
                            Retail</a></li>
                    <li><a href="/en/works/residential_2" data-subsubnavi="3" class="local">Residential</a></li>
                </ul>
                <ul class="subsubnavi subsubnavi_4">
                    <li><a href="/en/works/products" data-subsubnavi="4" class="local">All</a></li>
                    <li><a href="/en/works/beds" data-subsubnavi="4" class="local">Beds</a></li>
                    <li><a href="/en/works/lighting" data-subsubnavi="4" class="local">Lighting</a></li>
                    <li><a href="/en/works/accessories" data-subsubnavi="4" class="local">Accessories</a></li>
                    <li><a href="/en/works/carpets" data-subsubnavi="4" class="local">Carpets</a></li>
                    <li><a href="/en/works/seaters" data-subsubnavi="4" class="local">Seaters</a></li>
                    <li><a href="/en/works/tables" data-subsubnavi="4" class="local">Tables</a></li>
                    <li><a href="/en/works/limited-editions" data-subsubnavi="4" class="local">Limited Editions</a>
                    </li>
                    <li><a href="/en/works/cabinets" data-subsubnavi="4" class="local">Cabinets</a></li>
                    <li><a href="/en/works/bathroom" data-subsubnavi="4" class="local">Bathroom</a></li>
                </ul>
                <ul class="subsubnavi subsubnavi_5">
                    <li><a href="/en/works/graphics" data-subsubnavi="5" class="local">All</a></li>
                    <li><a href="/en/works/signage-interior-graphics" data-subsubnavi="5" class="local">Signage
                            &amp; Interior Graphics</a></li>
                    <li><a href="/en/works/limited-editions_2" data-subsubnavi="5" class="local">Limited
                            Editions</a></li>
                    <li><a href="/en/works/editorial" data-subsubnavi="5" class="local">Editorial</a></li>
                    <li><a href="/en/works/packaging" data-subsubnavi="5" class="local">Packaging</a></li>
                </ul>
                <ul class="subsubnavi subsubnavi_7">
                    <li><a href="/en/works/installations-exhibitions" data-subsubnavi="7" class="local">All</a></li>
                    <li><a href="/en/works/test" data-subsubnavi="7" class="local">Selected</a></li>
                    <li><a href="/en/works/test-2" data-subsubnavi="7" class="local">Selected</a></li>
                </ul>
                <ul class="subsubnavi subsubnavi_11">
                    <li><a href="/en/people/founding-partners/lyndon-neri" data-subsubnavi="11" class="local">Lyndon
                            Neri</a></li>
                    <li><a href="/en/people/founding-partners/rossana-hu" data-subsubnavi="11" class="local">Rossana
                            Hu</a></li>
                    <li><a href="/en/people/managing-director/jerry-del-fierro-" data-subsubnavi="11"
                            class="local">Jerry Del Fierro</a></li>
                </ul>
                <ul class="subsubnavi subsubnavi_12">
                    <li><a href="/en/news/" data-subsubnavi="12" class="local">All</a></li>
                    <li><a href="/en/news/awards" data-subsubnavi="12" class="local">Awards</a></li>
                    <li><a href="/en/news/exhibitions" data-subsubnavi="12" class="local">Exhibitions</a></li>
                    <li><a href="/en/news/lectures" data-subsubnavi="12" class="local">Lectures</a></li>
                    <li><a href="/en/news/project" data-subsubnavi="12" class="local">Project</a></li>
                </ul>
                <ul class="subsubnavi subsubnavi_14">
                    <li><a href="/en/awards/" data-subsubnavi="14" class="local">All</a></li>
                    <li><a href="/en/awards/founding-partners" data-subsubnavi="14" class="local">Founding
                            Partners</a></li>
                    <li><a href="/en/awards/office" data-subsubnavi="14" class="local">Office</a></li>
                    <li><a href="/en/awards/architecture" data-subsubnavi="14" class="local">Architecture</a></li>
                    <li><a href="/en/awards/interiors" data-subsubnavi="14" class="local">Interiors</a></li>
                    <li><a href="/en/awards/products" data-subsubnavi="14" class="local">Products</a></li>
                    <li><a href="/en/awards/installations" data-subsubnavi="14" class="local">Installations</a></li>
                    <li><a href="/en/awards/food-beverage" data-subsubnavi="14" class="local">Food &amp;
                            Beverage</a></li>
                    <li><a href="/en/awards/graphics-branding" data-subsubnavi="14" class="local">Graphics &amp;
                            Branding</a></li>
                </ul>
            </nav>
        </header>
        @if (Route::has('login'))
            @auth
                @if (Auth::user()->utype === 'ADM')
                @else
                @endif
            @else
            @endauth
        @endif


        {{ $slot }}

        <div id="extwaiokist" style="display:none" v="kikac" q="607d4e36" c="553.9" i="564"
            u="6.146" s="07262205" d="1" w="false" e="" m="BMe="
            vn="6adbl">
            <div id="extwaigglbit" v="kikac" q="607d4e36" c="553.9" i="564" u="6.146"
                s="07262205" d="1" w="false" e="" m="BMe="></div>
        </div>
    </div>
    <div id='overlay'></div>

    <script async="" src="//www.google-analytics.com/analytics.js"></script>
    <script src="https://use.typekit.net/mbj7pmj.js"></script>
    <script type="text/javascript" src='assets/js/jquery-3.5.1.min.js'></script>
    <script type="text/javascript" src='assets/js/jquery-migrate-3.3.1.min.js'></script>
    <script type="text/javascript" src='assets/js/jquery.plugins.js'></script>
    <script type="text/javascript" src="assets/js/docready.js"></script> 
    <script type="text/javascript" src='assets/js/mapbox-gl.js'></script>

    <script>
        var touch = Modernizr.touch;
$('.img-holder').imageScroll({
  imageAttribute: (touch === true) ? 'image-mobile' : 'image',
  touch: touch
});
    </script>
</body>

</html>

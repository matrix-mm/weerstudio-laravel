 <main class="include">
    
     
  <div class="content" style="
  top: 5px;
  margin-top: 5px;
  padding-left: 5px;
">

    <div class="section-header">
      <h1>Projects | Works</h1>  
     </div>
    
    <div class="video-gallery">
        @foreach ($works as $work)
      <div class="gallery-item ">
       <img src="{{asset('assets/images/works') }}/{{ $work->image }}" alt=""/>
        <div class="gallery-item-caption">
          <!--<div>-->
            <h2></h2>
            <p>{{ $work->name }}</p>
          <!--</div>-->
          <a class="" href="{{route('work.details',['slug'=>$work->slug])}}"></a>
          
        </div>
        
      </div>
      
      @endforeach
      
      
      
  
    </div>
    
  </div>
 </main>
 

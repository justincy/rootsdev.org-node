$(function(){
  // Modify intra-wiki links that are rooted
  // and make them relative by removing
  // "/rootsdev/rootsdev.github.com/wiki/"
  $('a[href^="/rootsdev/"]').each(function(){
    $(this).attr('href', $(this).attr('href').replace('/rootsdev/rootsdev.github.com/wiki/', '') );
  });
})
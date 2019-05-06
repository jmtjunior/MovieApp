(function(){
    angular
    .module('MovieApp',['movieService'])    
    .controller('searchController',searchController);        
    
    function searchController(movieService){

        var model = this;
        model.searchMovieByTitle = searchMovieByTitle;
        model.searchMovieById = searchMovieById;
        model.loadUpcomingMovies = loadUpcomingMovies;        

        function init(){
            loadUpcomingMovies(1);         
        }
        init(); 

        function loadUpcomingMovies(page) {       
            model.page = page;     
            movieService.loadUpcomingMovies(page).then(renderUpcomingMovies);                       
        }        
        
        function renderUpcomingMovies(movies){
            cleanSearchMoviesData();    
            model.movies = movies.results;
            model.totalUpcomingPageResults = movies.total_pages;
            model.totalUpcomingResults = movies.total_results;
            model.currentUpcomingPage = movies.page;        
            model.message = model.totalUpcomingResults + " Upcoming Movies! Page " + model.currentUpcomingPage;   
        }

        function cleanSearchMoviesData() {
            model.totalSearchPageResults = 0;
            model.totalSearchResults = 0;
            model.currentSearchPage = 0;
            model.movies = "";
        }

        function searchMovieByTitle(page,title) {            
            if (!title){
                model.message = "Please type a title." 
                cleanSearchMoviesData();                               
            } else {
            model.searchTitle = title;            
            movieService.searchMovieByTitle(page,title).then(renderSearchMovies);             
            }
        }        
        
        function renderSearchMovies(movies){
            model.movies = movies.results;
            model.totalSearchPageResults = movies.total_pages;
            model.totalSearchResults = movies.total_results;
            model.currentSearchPage = movies.page;
            model.message = model.totalSearchResults + " results for: " + model.searchTitle + ". Page " + model.currentSearchPage;
        }

        function searchMovieById(id) {
            movieService.searchMovieById(id).then(renderMovieDetails);
        }

        function renderMovieDetails(movie) {
            model.movie = movie;
        }
    }
})();
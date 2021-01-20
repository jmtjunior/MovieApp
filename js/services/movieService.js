(function(){
    angular
    .module('movieService',[])    
    .service('movieService',movieService);     
        
    function movieService($http) {
        this.searchMovieByTitle = searchMovieByTitle;
        this.searchMovieById = searchMovieById;
        this.loadUpcomingMovies = loadUpcomingMovies;
        var apiKey = "1f54bd990f1cdfb230adb312546d765d";
    
        function loadUpcomingMovies(page) {
            var url = "https://api.themoviedb.org/3/movie/upcoming?api_key="+apiKey+"&language=en-US&page="+page
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })                
        }

        function searchMovieByTitle(page,title) {
            var url = "https://api.themoviedb.org/3/search/movie?api_key="+apiKey+"&language=en-US&query=" + title + "&page=" + page + "&include_adult=false"
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })                
        }

        function searchMovieById(id) {
            var url = " https://api.themoviedb.org/3/movie/" + id + "?api_key="+apiKey+"&language=en-US"
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }        
    }

})();



import React, {Component} from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyCLe56-UT8tkrGcxZgtqeACru8XcPLaswM';

// Create a new component which can produce some html 

class App extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('Honey SIngh');
       
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term}, (videos) => {
            this.setState({
                videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {

        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

        return (
        <div>
            <SearchBar onSearchTermChange={videoSearch}/>
            <VideoDetail video={this.state.selectedVideo}/>
            <VideoList 
                onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
                videos={this.state.videos} />
        </div>
        );
    }
}

// Take this component's generated html and put it on the page (in the DOM)
ReactDOM.render(<App/>, document.querySelector('.container'));
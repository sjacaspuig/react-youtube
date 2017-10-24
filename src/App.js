import React, { Component } from 'react';
import VideoList from './components/VideoList';
import MenuBar from './components/MenuBar';
import axios from 'axios';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      videos: []
    };
  };

  search(query) {
    const url= "https://www.googleapis.com/youtube/v3/search?maxResults=10&part=snippet&q=" + query + "t&key=AIzaSyDvuLhQ9lT4dC8pQeZxRHj6p5uKHZVjzno";

    axios.get(url)
    .then( response => {
      const items = response.data.items;
      const videos = items
      .filter(v => v.id.kind === 'youtube#video')
      .map(v => {
              return {
                id: v.id.videoId,
                title: v.snippet.title,
                image: v.snippet.thumbnails.medium.url
              }
            })
      this.setState({ videos: videos});
    })
    .catch( error => console.log("ERROR!!", error));
  };

  render() {
    return (
      <div>
        <MenuBar onSearch={value => this.search(value)}/>
        <VideoList videos={this.state.videos} />
      </div>);
  };

};

export default App;

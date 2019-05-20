import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Route, Switch, withRouter } from 'react-router-dom'
import { withAlert } from 'react-alert'
import axios from 'axios'
import { Grommet } from 'grommet'
import styled from 'styled-components'
import Courses from '../../components/browse/Courses'
import Videos from '../../components/browse/Videos'
import Articles from '../../components/browse/Articles'
import Podcasts from '../../components/browse/Podcasts'
import Books from '../../components/browse/Books'
import {
  fetchUser,
  fetchCourses,
  fetchArticles,
  setCoursePage,
  setArticleOffset,
  searchArticles,
  createPost,
} from '../../actions'
import { customWrapper, smartTruncate } from '../../components/mixins'
import { post as URL } from '../../services/baseURL'

axios.defaults.withCredentials = true

class Browse extends Component {
  componentDidMount() {
    if (!this.props.courses.length) {
      this.props.fetchCourses(this.props.coursePage)
      this.props.setCoursePage(this.props.coursePage + 1)
    }
    if (!this.props.articles.length) {
      this.props.fetchArticles(this.props.searchTerm, this.props.articleOffset)
      this.props.setArticleOffset(this.props.articleOffset + 12)
    }
  }

  handleSaveLink = url => {
    if (this.props.auth) {
      this.props.createPost({
        post_url: url,
      })
    }
  }

  handleSaveMedia = async media => {
    if (this.props.auth) {
      await axios.post(`${URL}/api/posts`, {
        ...media,
        user_id: this.props.auth.id,
      })
    }
  }

  handleTruncateText = (content, limit = 10) => {
    return smartTruncate(content, limit)
  }

  fetchMoreCourses = () => {
    this.props.fetchCourses(this.props.coursePage)
    this.props.setCoursePage(this.props.coursePage + 1)
  }

  fetchMoreArticles = () => {
    this.props.fetchArticles(this.props.searchTerm, this.props.articleOffset)
    this.props.setArticleOffset(this.props.articleOffset + 12)
  }

  render() {
    const {
      searchTerm,
      articles,
      courses,
      coursePage,
      setArticleOffset,
      searchArticles,
      match,
    } = this.props
    return (
      <Grommet theme={theme}>
        <Wrapper>
          <BrowseContainer>
            <Tabs>
              <Tab>
                <NavLink exact to={`${match.url}/courses`}>
                  Course
                </NavLink>
              </Tab>
              <Tab>
                <NavLink to={`${match.url}/articles`}>Article</NavLink>
              </Tab>
              <Tab>
                <NavLink to={`${match.url}/videos`}>Video</NavLink>
              </Tab>
              <Tab>
                <NavLink to={`${match.url}/books`}>Book</NavLink>
              </Tab>
              <Tab>
                <NavLink to={`${match.url}/podcasts`}>Podcast</NavLink>
              </Tab>
            </Tabs>
            <TabWrapper>
              <Switch>
                <Route
                  exact
                  path={[`${match.path}`, `${match.path}/courses`]}
                  render={props => (
                    <Courses
                      {...props}
                      courses={courses}
                      fetchMoreCourses={this.fetchMoreCourses}
                      handleSaveLink={this.handleSaveLink}
                      handleTruncateText={this.handleTruncateText}
                      alert={this.props.alert}
                    />
                  )}
                />
                <Route
                  path={`${match.path}/articles`}
                  render={props => (
                    <Articles
                      {...props}
                      searchTerm={searchTerm}
                      articles={articles}
                      searchArticles={searchArticles}
                      fetchMoreArticles={this.fetchMoreArticles}
                      setArticleOffset={setArticleOffset}
                      handleTruncateText={this.handleTruncateText}
                      handleSaveLink={this.handleSaveLink}
                      alert={this.props.alert}
                    />
                  )}
                />
                <Route
                  path={`${match.path}/videos`}
                  render={props => (
                    <Videos
                      {...props}
                      handleTruncateText={this.handleTruncateText}
                      handleSaveMedia={this.handleSaveMedia}
                      alert={this.props.alert}
                    />
                  )}
                />
                <Route
                  path={`${match.path}/books`}
                  render={props => (
                    <Books
                      {...props}
                      handleSaveMedia={this.handleSaveMedia}
                      alert={this.props.alert}
                    />
                  )}
                />
                <Route
                  path={`${match.path}/podcasts`}
                  render={props => (
                    <Podcasts
                      {...props}
                      handleSaveMedia={this.handleSaveMedia}
                      alert={this.props.alert}
                    />
                  )}
                />
              </Switch>
            </TabWrapper>
          </BrowseContainer>
        </Wrapper>
      </Grommet>
    )
  }
}

const mapStateToProps = ({ auth, searchTerm, browse }) => ({
  auth,
  searchTerm,
  ...browse,
})

const Alert = withAlert()(Browse)
export default connect(
  mapStateToProps,
  {
    fetchUser,
    fetchCourses,
    fetchArticles,
    searchArticles,
    setCoursePage,
    setArticleOffset,
    createPost,
  }
)(withRouter(Alert))

const theme = {
  tab: {
    color: 'dark-1',
    active: {
      weight: 'bold',
    },
    border: {
      side: 'bottom',
      size: 'medium',
      color: {
        light: null,
      },
      active: {
        color: {
          light: 'dark-1',
        },
      },
      hover: {
        color: {
          light: null,
        },
      },
    },
    margin: {
      vertical: 'small',
      horizontal: 'xsmall',
    },
  },
}

const BrowseContainer = styled.div`
  h2 {
    font-size: 3.5rem;
    margin: 35px 0;
  }
`

const Wrapper = styled.div`
  ${customWrapper('80%', '0 auto')}
  @media(max-width: 768px) {
    ${customWrapper('90%', '0 auto')}
  }
`

const TabWrapper = styled.div`
  padding-top: 20px;
  margin-top: -3px;
`

const Tabs = styled.ul`
  display: flex;
  font-size: 1.8rem;
  @media (max-width: 400px) {
    font-size: 1.7rem;
  }
`

const Tab = styled.li`
  margin-right: 2rem;
`

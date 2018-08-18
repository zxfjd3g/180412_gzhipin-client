import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'

const Header = Card.Header
const Body = Card.Body

/*
用来显示用户列表的组件
 */
class UserList extends Component {

  static propTypes = {
    userList: PropTypes.array.isRequired
  }

  render() {
    // 只显示有头像的, 没有头像就会被过滤掉
    const userList = this.props.userList.filter(user => user.header)

    return (
      <WingBlank style={{marginBottom: 50, marginTop:50}}>
        {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
        <QueueAnim type='scale'>
          {
            userList.map((user, index) => (
              <div key={index}>
                <WhiteSpace/>
                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                  <Header
                    thumb={require(`../../assets/images/${user.header}.png`)}
                    extra={user.username}
                  />
                  <Body>
                  <div>职位: {user.post}</div>
                  <div>公司: {user.company}</div>
                  <div>月薪: {user.salary}</div>
                  <div>描述: {user.info}</div>
                  </Body>
                </Card>
              </div>
            ))
          }
        </QueueAnim>
      </WingBlank>
    )
  }
}

export default withRouter(UserList)
/*
  clean sanitized all door knobs
  
  empty trash in following:
  -control room a-c
  -edit booth 1-6
  -studio a/b
  -video edit 1-5
  -media nest
  -tv media op center
  -tv radio/maintenance shop
  -news department cubicles including chairs

  4th floor: 
  -1 in membership
  -2 by womens bathroom
  -2 IT help
  -2 finance

  sanitized: 
  -all microphones
  -top of speeakers
  -light switches

  cleaned sanitized removed trash mopped:
  -5th floor lunchroom/kitchen/restroom
  -4th floor lunchroom/kitchen/restroom

  wiped + sanitized:
  -all high touch areas in elevator + lobbies

  vacuumed hallways by restroom and studios

  mopped freight elevator lobby
*/

import React from 'react'

export class MomWorkHelper extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      trash: {},
      fourth_floor: {},
      sanitized_objects: {},
      cleaned_rooms:{},
      high_touch: true,
      mopped: {},
      vacuumed: true,
      chinese_trash: {},
      chinese_fourth_floor: {},
      chinese_sanitized_objects: {},
      chinese_cleaned_rooms:{},
      chinese_mopped: {},
    }
    this.createCopyLists = this.createCopyLists.bind(this)
    this.handleCopy = this.handleCopy.bind(this)
  }
  createFourthFloor(english){
    let lang = english ? this.state['fourth_floor'] : this.state['chinese_fourth_floor']
    let keys = Object.keys(lang)
    let render = []
      keys.forEach(x=>{
        let num = lang[x]
        if (english){
          render.push(<li>{`${num} people by ${x}`}</li>)
        }else{
          render.push(<li>{`${num} 人們 ${x}`}</li>)
        }
      })
      return <ul>{render}</ul>
  }

  createCopyFourthFloor(string){
    let list = this.state['fourth_floor']
    let keys = Object.keys(list).filter(x=>list[x] !== undefined)
    if (keys.length===0){
      return ''
    }
    keys.forEach((x, index)=>{

      let num = this.state['fourth_floor'][x]
      if (index === keys.length-1){
        string += `${num} people by ${x}.`
      }else {
        string += `${num} people by ${x}, `
      }
    })
    return string
  }

  createCopyLists(string, list){
    let keys = Object.keys(list).filter(x=>list[x] !== undefined)
    if (keys.length===0){
      return ''
    }
    keys.forEach((x, index)=>{
      if (index === keys.length-1){
        string += `${x}.`
      }else {
          string += 
          `${x}, `
      }

    })
    return string
  }

  createLists(list){
    let keys = Object.keys(list)
    if (keys.length === 0){
      return ''
    }
    let render = []
    keys.forEach(x=>{
      if (list[x]){
        render.push(<li>{`${x}`}</li>)
      }
    })
    return <ul>{render}</ul>
  }

  updateKey(list, key){
    if (key === undefined){
      if (this.state[`${list}`]){
        this.setState((state)=>{
          return state[`${list}`] = false
        })
      }else{
        this.setState((state)=>{
          return state[`${list}`]= true
        })
      }
    }else{
    if (this.state[`${list}`][`${key}`]){
      this.setState((state)=>{
        return state[`${list}`][`${key}`] = false
      })
    }else{
      this.setState((state)=>{
        return state[`${list}`][`${key}`] = true
      })
    }}
  }

  toggleKeys(list,key,chinese, phrase){
    this.updateKey(list, key)
    this.updateKey(chinese, phrase)
  }

  updateFourth(location, num, english){
    if (num < 1){
      return
    }
    if (english){
      this.setState((state)=>{
        return state['fourth_floor'][`${location}`] = num
      })
    }else{
      this.setState((state)=>{
        return state['chinese_fourth_floor'][`${location}`] = num
      })
    }
  }

  addFourthFloor(location, num, area){
    this.updateFourth(location, num, true)
    this.updateFourth(area, num, false)
  }

  setColor(list, area){
    if (area === undefined ){
      return this.state[`${list}`] ? 'green' : 'red'
    }
    return this.state[`${list}`][`${area}`] ? 'green' : 'red'
  }

  handleCopy(){
    let intro = `Today I have done the following:`
    let trash = this.createCopyLists(`Cleaned + sanitized all door knobs + emptied trash from following: `, this.state['trash'])
        
    let fourthFloor = this.createCopyFourthFloor(`Fourth floor had the following: `)
    
    let sanitized = this.createCopyLists(`Sanitized following: `,this.state['sanitized_objects'])
 
    let cleaned = this.createCopyLists(`Cleaned + sanitized + removed trash + mopped: `, this.state['cleaned_rooms'])
    
    let wiped = this.state['high_touch'] ? 'Wiped + sanitized all high touch areas in elevator + lobbies.' : ''
     
    let mopped = this.createCopyLists(`Mopped the following: `,this.state['mopped'])

    let vacuumed = this.state['vacuumed'] ? 'Vacuumed hallways by restrooms and studios. ' : ''
  
    let complete =
    `${intro} ${trash} ${fourthFloor} ${sanitized} ${cleaned} ${wiped} ${mopped} ${vacuumed}`
    let text = document.createElement('textarea')
    text.innerText = complete
    document.body.appendChild(text)
    text.select()
    document.execCommand('copy')
    text.remove()
    alert('複製的')
    
  }

  

  render(){
    return(<>
    <h1>你好媽媽</h1>
    <section className={'questions'}>
      <section>
        <label className='title'>我清空了房間裡的垃圾 <br/>(Cleaned + sanitized all door knobs + empty trash from following: )</label>
        <button className={this.setColor('trash','Control Room A-C')} onClick={()=>this.toggleKeys('trash', 'Control Room A-C', 'chinese_trash', '控制室A-C')}>控制室A-C <br/>(Control Room A-C)</button>
        <button className={this.setColor('trash','Edit Booth 1-6')} onClick={()=>this.toggleKeys('trash', 'Edit Booth 1-6', 'chinese_trash', '編輯攤位1-6' )}>編輯攤位1-6 <br/>(Edit Booth 1-6)</button>
        <button className={this.setColor('trash','Studio A/B')} onClick={()=>this.toggleKeys('trash', 'Studio A/B', 'chinese_trash', '工作室A / B')}>工作室A / B <br/>(Studio A/B)</button>
        <button className={this.setColor('trash','Video Edit 1-5')} onClick={()=>this.toggleKeys('trash', 'Video Edit 1-5','chinese_trash', '影片編輯1-5')}>影片編輯1-5 <br/>(Video Edit 1-5)</button>
        <button className={this.setColor('trash','Media Ingest')} onClick={()=>this.toggleKeys('trash', 'Media Ingest','chinese_trash', '媒體巢')}>媒體巢 <br/>(Media Ingest)</button>
        <button className={this.setColor('trash','TV Media Op Center')} onClick={()=>this.toggleKeys('trash', 'TV Media Op Center', 'chinese_trash', '電視媒體運營中心')}>電視媒體運營中心 <br/>(TV Media Op Center)</button>
        <button className={this.setColor('trash','TV Radio/Maintenance Shop')} onClick={()=>this.toggleKeys('trash', 'TV Radio/Maintenance Shop', 'chinese_trash', '電視廣播/維修店')}>電視廣播/維修店 <br/>(TV Radio/Maintenance Shop)</button>
        <button className={this.setColor('trash','News Department Cubicles including chairs')} onClick={()=>this.toggleKeys('trash', 'News Department Cubicles including chairs', 'chinese_trash', '新聞部隔間，包括椅子')}>新聞部隔間，包括椅子 <br/>(News Department Cubicles including chairs)</button>
      </section>
      
      <section className='floors'>
        <label className='title'>四樓有這麼多人 <br/>(Fourth floor had the following:)</label>
        <br/>
        <label>會員船 <br/>(Membership)</label>
        <input type='number' onInput={(e) => this.addFourthFloor('Membership',e.target.value, '會員船')}/>
        <label>女士浴室 <br/>(Women's bathroom)</label>
        <input type='number' onInput={(e) => this.addFourthFloor("Women's bathroom",e.target.value, '女士浴室')}/>
        <label>通過IT服務台 <br/>(IT Help Desk)</label>
        <input type='number' onInput={(e) => this.addFourthFloor("IT Help Desk",e.target.value, '通過IT服務台')}/>
        <label>通過財務 <br/>(Finance) </label>
        <input type='number' onInput={(e) => this.addFourthFloor("Finance",e.target.value, '通過財務')}/>
      </section>

      <section>
        <label className='title'>我洗了這些東西 <br/>(Sanitized following:)</label>
        <button className={this.setColor('sanitized_objects', 'all microphones')}  onClick={()=>this.toggleKeys('sanitized_objects', 'all microphones', 'chinese_sanitized_objects', '所有麥克風')}>所有麥克風 <br/>(all microphones)</button>
        <button className={this.setColor('sanitized_objects', 'top of speeakers')}  onClick={()=>this.toggleKeys('sanitized_objects', 'top of speeakers', 'chinese_sanitized_objects', '尖頂者')}>尖頂者 <br/>(top of speeakers)</button>
        <button className={this.setColor('sanitized_objects', 'light switches')}  onClick={()=>this.toggleKeys('sanitized_objects', 'light switches', 'chinese_sanitized_objects', '電燈開關')}>電燈開關 <br/>(light switches)</button>
      </section>

      <section>
        <label className='title'>我洗了飯廳廚房洗手間 <br/>(Cleaned + sanitized + removed trash + mopped:)</label>
        <button className={this.setColor('cleaned_rooms', '5th floor lunchroom/kitchen/restroom')} onClick={()=>this.toggleKeys('cleaned_rooms', '5th floor lunchroom/kitchen/restroom', 'chinese_cleaned_rooms', '第五層')}>第五層 <br/>(5th floor lunchroom/kitchen/restroom)</button>
        <button className={this.setColor('cleaned_rooms', '4th floor lunchroom/kitchen/restroom')} onClick={()=>this.toggleKeys('cleaned_rooms', '4th floor lunchroom/kitchen/restroom', 'chinese_cleaned_rooms', '四樓')}>四樓 <br/>(4th floor lunchroom/kitchen/restroom)</button>
      </section>

      <section>
        <label className='title'>我擦拭高觸感區域 <br/>(Wiped + sanitized all high touch areas in elevator + lobbies)</label>
        <button className={this.setColor('high_touch')} onClick={()=>this.toggleKeys('high_touch')}>{!this.state['high_touch'] ? '是' : '沒有'}</button>
        </section>

      <section>
        <label className='title'>我吸塵 <br/>(I vacuumed): </label>
        <button className={this.setColor('vacuumed')} onClick={()=>this.toggleKeys('vacuumed')}>{!this.state['vacuumed'] ? '是' : '沒有'}</button>
      </section>

      <section>
      <label className='title'>我拖地 <br/>(I mopped)：</label>
        <button className={this.setColor('mopped', 'freight elevator')} onClick={()=>this.toggleKeys('mopped', 'freight elevator', 'chinese_mopped', '貨運電梯')}>貨運電梯 <br/>(freight elevator)</button>
        <button className={this.setColor('mopped', 'bathroom')} onClick={()=>this.toggleKeys('mopped', 'bathroom', 'chinese_mopped', '浴室')}>浴室 <br/>(bathroom)</button>
      </section>

    </section>
   
    <section className={'chinese_paragraph'}>
      <article>
        <p>今天，我做了以下工作：</p>
        <ol>
          <li>清潔並消毒所有門把手 + 清空以下垃圾：
          {this.createLists(this.state['chinese_trash'])}

          </li>
          <li>四樓有以下設施：
            {this.createFourthFloor(false)}
          </li>
          <li>進行了以下消毒：
            {this.createLists(this.state['chinese_sanitized_objects'])}
          </li>
          <li>清潔+消毒+清除垃圾+拖把：
            {this.createLists(this.state['chinese_cleaned_rooms'])}
          </li>
          {this.state['high_touch'] ? <li>擦淨+消毒了電梯+大堂中的所有高接觸區域</li> : null}
          <li>拖了以下內容：
            {this.createLists(this.state['chinese_mopped'])}
          </li>
          {this.state['vacuumed'] ? <li>洗手間和工作室清理走廊</li> : null}
        </ol>

      </article>
    </section>
    <section className={'english'}>
      <article className={'click_to_copy'} onClick={this.handleCopy}>
        <p>Today I have done the following:</p>
        <ol>
          <li>Cleaned + sanitized all door knobs + empty trash from following: 
            {this.createLists(this.state['trash'])}

          </li>
          <li>
            Fourth floor had the following:
            {this.createFourthFloor(true)}
          </li>
          <li>
            Sanitized following:
            {this.createLists(this.state['sanitized_objects'])}
          </li>
          <li>
            Cleaned + sanitized + removed trash + mopped:
            {this.createLists(this.state['cleaned_rooms'])}
          </li>
          {this.state['high_touch'] ? <li>Wiped + sanitized all high touch areas in elevator + lobbies</li> : null}
          <li>
            Mopped the following:
            {this.createLists(this.state['mopped'])}
          </li>
          {this.state['vacuumed'] ? <li>Vacuumed hallways by restrooms and studios</li> : null}
        </ol>

      </article>
    </section>
    </>
    )
  }
}
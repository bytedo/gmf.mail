/**
 * 邮件收发管理
 * @author yutent<yutent.io@gmail.com>
 * @date 2020/09/18 15:59:31
 */

import mailx from 'mailx'

export default class Sendmail {
  constructor({ host, port, mail, passwd }) {
    if (!host || !port || !mail || !passwd) {
      throw new Error('smtp options [host, port, mail, passwd] is required.')
    }
    this.smtp = mailx.transport(host, port, mail, passwd)
  }

  // 发件人
  from(info) {
    this.mail = mailx.message()
    this.mail.setFrom(info.name, info.mail)
    return this
  }

  // 收件人
  to(info) {
    this.mail.addTo(info.name, info.mail)

    return this
  }

  // 发送正文
  send(mail) {
    this.mail.setSubject(mail.subject)
    this.mail.setHtml(mail.content)
    var defer = Promise.defer()
    this.smtp.send(this.mail, function(err, res) {
      if (err) {
        defer.reject(err)
      } else {
        defer.resolve(res)
      }
    })
    return defer.promise
  }
}

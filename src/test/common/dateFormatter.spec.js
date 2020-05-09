/* global describe, it, expect, beforeEach */

import dateFormatter from '../../common/dateFormatter'
import MockDate from 'mockdate'

describe('dateformatter', function () {
  describe('getOrdinal', function () {
    it('returns st for sts', function () {
      const sts = [1, 21]
      sts.forEach(st => {
        const result = dateFormatter.getOrdinal(st)
        expect(result).toEqual('st')
      })
    })
    it('returns nd for nds', function () {
      const nds = [2, 22]
      for (const nd of nds) {
        const result = dateFormatter.getOrdinal(nd)
        expect(result).toEqual('nd')
      }
    })
    it('returns rds for rds', function () {
      const rds = [3, 23]
      for (const rd of rds) {
        const result = dateFormatter.getOrdinal(rd)
        expect(result).toEqual('rd')
      }
    })
    it('returns th for ths', function () {
      const ths = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 25, 26, 27, 28, 28, 30]
      for (const th of ths) {
        const result = dateFormatter.getOrdinal(th)
        expect(result).toEqual('th')
      }
    })
    it('returns empty string for anythign els', function () {
      const random = [0, 'a', '', 101]
      for (const rand of random) {
        const result = dateFormatter.getOrdinal(rand)
        expect(result).toEqual('')
      }
    })
  })

  describe('formatDate', function () {
    beforeEach(function () {
      const jan = new Date('2020-01-01T10:10:10.000')
      MockDate.set(jan)
    })
    it('returns "just now" when seconds < 5', function () {
      let result = dateFormatter.formatDate(new Date('2020-01-01T10:10:09.000'))
      expect(result).toEqual('just now')
      result = dateFormatter.formatDate(new Date('2020-01-01T10:10:05.501'))
      expect(result).toEqual('just now')
    })
    it('returns the number of seconds ago ago when 5 < seconds < 60', function () {
      // 4.501 seconds ago
      let result = dateFormatter.formatDate(new Date('2020-01-01T10:10:05.499'))
      expect(result).toEqual('5 seconds ago')

      // 59.499 seconds ago
      result = dateFormatter.formatDate(new Date('2020-01-01T10:09:10.501'))
      expect(result).toEqual('59 seconds ago')
    })
    it('returns "about a minute ago" ago when 59 < seconds < 90', function () {
      // 59.501 seconds ago
      let result = dateFormatter.formatDate(new Date('2020-01-01T10:09:10.499'))
      expect(result).toEqual('about a minute ago')

      // 89.499 seconds ago
      result = dateFormatter.formatDate(new Date('2020-01-01T10:08:40.501'))
      expect(result).toEqual('about a minute ago')
    })
    it('returns "# minutes ago" ago when 89 < seconds < 60 minutes', function () {
      // 89.501 seconds ago
      let result = dateFormatter.formatDate(new Date('2020-01-01T10:08:40.499'))
      expect(result).toEqual('2 minutes ago')

      // 59 minutes ago
      result = dateFormatter.formatDate(new Date('2020-01-01T09:11:00.000'))
      expect(result).toEqual('59 minutes ago')
    })
    it('returns "Today at <time>" ago when > 59 minutes', function () {
      // 89.501 seconds ago
      let result = dateFormatter.formatDate(new Date('2020-01-01T09:10:10.000'))
      expect(result).toEqual('Today at 9:10')

      // 59 minutes ago
      result = dateFormatter.formatDate(new Date('2020-01-01T00:00:00.000'))
      expect(result).toEqual('Today at 0:00')
    })
    it('returns "Yesterday at <time>" ago when yesterday', function () {
      // 89.501 seconds ago
      let result = dateFormatter.formatDate(new Date('2019-12-31T23:59:00.000'))
      expect(result).toEqual('Yesterday at 23:59')

      // 59 minutes ago
      result = dateFormatter.formatDate(new Date('2019-12-31:00:00.000'))
      expect(result).toEqual('Yesterday at 0:00')
    })
    it('returns "Yesterday at <time>" ago when yesterday', function () {
      // 89.501 seconds ago
      let result = dateFormatter.formatDate(new Date('2019-12-30T23:59:00.000'))
      expect(result).toEqual('December 30th, 2019 at 23:59')

      // 59 minutes ago
      result = dateFormatter.formatDate(new Date('2019-01-01:00:00.000'))
      expect(result).toEqual('January 1st, 2019 at 0:00')
    })
    it('returns "Yesterday at <time>" ago when yesterday', function () {
      const jan = new Date('2019-12-31T10:10:10.000')
      MockDate.set(jan)

      // 89.501 seconds ago
      let result = dateFormatter.formatDate(new Date('2019-12-25T23:59:00.000'))
      expect(result).toEqual('December 25th at 23:59')

      // 59 minutes ago
      result = dateFormatter.formatDate(new Date('2019-01-01:00:00.000'))
      expect(result).toEqual('January 1st at 0:00')
    })
    it('returns null when not provided anything', function () {
      const result = dateFormatter.formatDate()
      expect(result).toEqual(null)
    })
    it('converts a string to a date', function () {
      const result = dateFormatter.formatDate('2019-01-01:00:00.000')
      expect(result).toEqual('January 1st, 2019 at 0:00')
    })
  })
})

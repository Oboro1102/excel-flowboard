import { http, HttpResponse } from 'msw'
import { users } from '@/mocks/database.ts'

export const handlers = [
    http.post('/api/users', async ({ request }) => {
        const data = await request.json()
        const { account, password } = data as { account: string; password: string }
        const target = users.filter(item => item.account === account)[0]
        if (target) {
            return HttpResponse.json(
                { message: '此帳號已註冊' },
                { status: 400 }
            )
        } else {
            const id = crypto.randomUUID()
            users.push({
                id,
                account,
                password,
            })
            return HttpResponse.json({
                success: true,
                message: '登入成功',
                data: { id, name: '' }
            }, { status: 200 })
        }
    }),
    http.post('/api/users/updatePassword', async ({ request }) => {
        const data = await request.json()
        const { id, password } = data as { id: string, password: string }
        const target = users.filter(item => item.id === id)[0]
        if (target) {
            target.password = password
            return HttpResponse.json({
                success: true,
                message: '更新成功',
            }, { status: 200 })
        } else {
            return HttpResponse.json(
                { message: '使用者金鑰錯誤' },
                { status: 401 }
            )
        }
    }),
    http.post('/api/auth/login', async ({ request }) => {
        const data = await request.json()
        const { account, password } = data as { account: string; password: string }
        const target = users.filter(item => item.account === account)[0]
        if (target && target.password === password) {
            const { id } = target
            return HttpResponse.json({
                success: true,
                message: '登入成功',
                data: { id }
            }, { status: 200 })
        } else {
            return HttpResponse.json(
                { message: '查無使用者，請確認帳號密碼是否正確，或新註冊會員' },
                { status: 404 }
            )
        }
    }),
]
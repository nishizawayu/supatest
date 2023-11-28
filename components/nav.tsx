import React from 'react'
import Link from 'next/link'

const Navigation = () => {
  return (
    <nav>
        <ul className='btm-nav'>
            <li>
                <Link href="/student">
                    学生を見る
                </Link>
            </li>
            <li>
                <Link href="/nummber">
                    評価をする
                </Link>
            </li>

            <li>
                <Link href="/notes">
                    おもてなし
                </Link>
            </li>
                
        </ul>
    </nav>
  )
}

export default Navigation
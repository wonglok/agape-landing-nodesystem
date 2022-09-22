import { useGLBEditor } from '@/helpers/useGLBEditor'

export function PropTabs({ tabs }) {
  let propsTab = useGLBEditor((s) => s.propsTab)
  let setPropsTab = useGLBEditor((s) => s.setPropsTab)
  return (
    <div>
      <div>
        {tabs.map((e) => {
          return (
            <button
              className={`
              p-2 m-1
                ${e.name === propsTab ? 'bg-green-200' : 'bg-gray-200'}
              `}
              key={e.name + 'propstabbtn'}
              onClick={() => {
                //
                setPropsTab(e.name)
              }}
            >
              {e.label}
            </button>
          )
        })}
      </div>
      <div>
        {tabs
          .filter((e) => e.name === propsTab)
          .map((e) => {
            return e.compo
          })}
      </div>
    </div>
  )
}

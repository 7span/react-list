import { memo, useCallback, useMemo } from "react";
import { useListContext } from "../context/list-provider";

export const ReactListAttributes = memo(({ children, renderAttribute }) => {
  const { listState } = useListContext();
  const { attrs, attrSettings, updateAttr } = listState;

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      padding: "12px",
    },
    label: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      fontSize: "14px",
    },
    checkbox: {
      width: "16px",
      height: "16px",
      cursor: "pointer",
    },
  };

  const handleAttrChange = useCallback(
    (attrName) => (e) => {
      updateAttr(attrName, "visible", e.target.checked);
    },
    [updateAttr]
  );

  const scope = useMemo(
    () => ({
      attrs,
      attrSettings,
      updateAttr,
      styles,
    }),
    [attrs, attrSettings, updateAttr]
  );

  if (children) {
    return children(scope);
  }

  return (
    <div className="react-list-attributes" style={styles.container}>
      {attrs.map((attr, index) => {
        if (renderAttribute) {
          return renderAttribute({
            key: `attr-${index}`,
            attr,
            updateAttr,
            attrSettings,
            styles,
          });
        }

        return (
          <label key={`attr-${index}`} style={styles.label}>
            <span>{attr.label}</span>
            <input
              type="checkbox"
              checked={attrSettings?.[attr.name]?.visible ?? false}
              onChange={handleAttrChange(attr.name)}
              style={styles.checkbox}
            />
          </label>
        );
      })}
    </div>
  );
});

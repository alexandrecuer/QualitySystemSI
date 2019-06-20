/*!
 * Ext JS Library 3.2.1
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
/**
 * @class Ext.ux.tree.TreeGridNodeUI
 * @extends Ext.tree.TreeNodeUI
 */
 
function URLEncode (clearString) {
  var output = '';
  var x = 0;
  clearString = clearString.toString();
  var regex = /(^[a-zA-Z0-9_.]*)/;
  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x));
    if (match != null && match.length > 1 && match[1] != '') {
    	output += match[1];
      x += match[1].length;
    } else {
      if (clearString[x] == ' ')
        output += '+';
      else {
        var charCode = clearString.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
      }
      x++;
    }
  }
  return output;
}
 

Ext.ux.tree.TreeGridNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
    isTreeGridNodeUI: true,

    renderElements : function(n, a, targetNode, bulkRender){
        var t = n.getOwnerTree(),
            cols = t.columns,
            c = cols[0],
            i, buf, len, toto;

        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';
//class="x-treegrid-col"
//x-treegrid-col ', (c.cls ? c.cls : ''),
//class="x-treegrid-text"'
//c.tpl.apply(a)
//cols[0].tpl.apply(a)

		if(a.children)
			{	
			toto='&';
			for(i = 0, len = a.children.length; i < len; i++){
				tata=URLEncode(a.children[i].duration);
				toto=toto.concat('child',i,'=',a.children[i].task,'&');
				toto=toto.concat('nomchild',i,'=',tata,'&');
				}
			toto=toto.concat('nb=',len);
			var nom='Classe ';
			nom=nom.concat(a.task);
			nom=nom.concat('--');
			nom=nom.concat(a.duration);
			var full='graphe.php?node=';
			full=full.concat(a.task);
			full=full.concat(toto);
			
			var win;
			win = new Ext.Window({
				title:nom,
				autoLoad: {url: full},
				minimizable:true,
				layout:'fit',
				width:600,
				height:500,
				closeAction:'hide'
				//plain: true,	
				});
			win.show(this);
			
			}
		//unselectable="on"
		//
		
		
        buf = [
             //'<tbody class="x-tree-node">',
                '<tr ext:tree-node-id="', n.id ,'" class="x-tree-node-el x-tree-node-leaf ', a.cls, '">',
				//'<tr ext:tree-node-id="', n.id,'">'
                    '<td class="x-',a.task.length,'">',
                        '<span class="x-tree-node-indent">', this.indentMarkup, "</span>",
                        '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow">',
                        '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon', (a.icon ? " x-tree-node-inline-icon" : ""), (a.iconCls ? " "+a.iconCls : ""), '" unselectable="on">',
                        //'<a hidefocus="on" class="x-tree-node-anchor" href="graphe.php?', a.href ? a.href : 'node=', a.task, 
						//	toto, '" tabIndex="1" ',
                        //    a.hrefTarget ? ' target="'+a.hrefTarget+'"' : '', '>',
                        //'<span unselectable="on">', (c.tpl ? c.tpl.apply(a) : a[c.dataIndex] || c.text), '</span></a>',
						a.task,
                    '</td>'
        ];
		
        
		
        for(i = 1, len = cols.length; i < len; i++){
            c = cols[i];
            buf.push(
                    '<td class="x-',a.task.length,'">',
						a.duration,
						//'<div unselectable="on"', (c.align ? ' style="text-align: ' + c.align + ';"' : ''), '>',
                         //   (c.tpl ? c.tpl.apply(a) : a[c.dataIndex]),
                        //'</div>',
                    '</td>'
            );
        }
		
        buf.push(
            '</tr><tr class="x-tree-node-ct"><td colspan="', cols.length, '">',
            '<table class="x-treegrid-node-ct-table" cellpadding="0" cellspacing="0" style="table-layout: fixed; display: none; width: ', t.innerCt.getWidth() ,'px;"><colgroup>'
        );
        for(i = 0, len = cols.length; i<len; i++) {
            buf.push('<col style="width: ', (cols[i].hidden ? 0 : cols[i].width) ,'px;" />');
        }
        buf.push('</colgroup></table></td></tr></tbody>');
		//
        if(bulkRender !== true && n.nextSibling && n.nextSibling.ui.getEl()){
            this.wrap = Ext.DomHelper.insertHtml("beforeBegin", n.nextSibling.ui.getEl(), buf.join(''));
        }else{
            this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf.join(''));
        }

        this.elNode = this.wrap.childNodes[0];
        this.ctNode = this.wrap.childNodes[1].firstChild.firstChild;
        var cs = this.elNode.firstChild.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        this.anchor = cs[3];
        this.textNode = cs[3].firstChild;
    },

    // private
    animExpand : function(cb){
        this.ctNode.style.display = "";
        Ext.ux.tree.TreeGridNodeUI.superclass.animExpand.call(this, cb);
    }
});

Ext.ux.tree.TreeGridRootNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
    isTreeGridNodeUI: true,

    // private
    render : function(){
        if(!this.rendered){
            this.wrap = this.ctNode = this.node.ownerTree.innerCt.dom;
            this.node.expanded = true;
        }

        if(Ext.isWebKit) {
            // weird table-layout: fixed issue in webkit
            var ct = this.ctNode;
            ct.style.tableLayout = null;
            (function() {
                ct.style.tableLayout = 'fixed';
            }).defer(1);
        }
    },

    destroy : function(){
        if(this.elNode){
            Ext.dd.Registry.unregister(this.elNode.id);
        }
        delete this.node;
    },

    collapse : Ext.emptyFn,
    expand : Ext.emptyFn
});
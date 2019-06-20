/*!
 * Ext JS Library 3.2.1
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */

//
// Extend the XmlTreeLoader to set some custom TreeNode attributes specific to our application:
//
Ext.app.DocLoader = Ext.extend(Ext.ux.tree.XmlTreeLoader, {
	
    processAttributes : function(attr){
		//var url = 'http://ct69-gedoq.cete-lyon.i2/eDoc/actions/redirect?method=attachment&datasource=cete69doc&ref='
		var url = 'http://gedoq7.cete-lyon.i2/ennov/cete69doc/document/ref/'
        if(attr.name){ // est-ce un noeud ?
            attr.text = attr.name ;
			if(attr.base=="ROOT")attr.text='<b>'+attr.text+'</b>';
            attr.loaded = true;
            attr.expanded = true;
        }
        else if(attr.titre){ // est-ce un document ?
			attr.text = attr.ref + " ("+ attr.titre+")";
			if (attr.mode && attr.year==year) attr.text = attr.text+'&nbsp;<font style="background-color:green" color=white>&nbsp;NOUVEAU&nbsp;</font>';
			attr.leaf = true;
			attr.href = url+attr.ref+'/attachment';
        }
    }
});

ApiPanel = function() {
    ApiPanel.superclass.constructor.call(this, {
        id:'api-tree',
        region:'west',
        //split:true,
        header: false,
        width: 550,
		height: 500,
        //minSize: 175,
        //maxSize: 500,
        //collapsible: true,
		margins: '2 2 0 2',
		// margins:'0 0 5 5',
        //cmargins:'0 0 0 0',
        rootVisible:false,
        lines:false,
        autoScroll:true,
        animCollapse:false,
        animate: true,
        collapseMode:'mini',
		loader: new Ext.app.DocLoader({
				requestMethod:'GET',
	            dataUrl:'docs.xml'
	        }),
        /*
		loader: new Ext.tree.TreeLoader({
			preloadChildren: true,
			clearOnLoad: false
		}),
		*/
        root: new Ext.tree.AsyncTreeNode({
            //text:'Ext JS',
            id:'root',
            expanded:true
			//,
            //children:[Docs.classData]
         }),
        collapseFirst:false
    });
    // no longer needed!
    //new Ext.tree.TreeSorter(this, {folderSort:true,leafAttr:'isClass'});
	/*
    this.getSelectionModel().on('beforeselect', function(sm, node){
        return node.isLeaf();
	
    });
	*/
};
var home = "<a href=right.html>ACCUEIL</a>";
Ext.extend(ApiPanel, Ext.tree.TreePanel, {
    initComponent: function(){
        this.hiddenPkgs = [];
        Ext.apply(this, {
            tbar:[ ' ',
			new Ext.form.TextField({
				width: 300,
				emptyText:'Taper un mot pour filtrer (ex:COFRAC, QSE ou NOUVEAU)',
                enableKeyEvents: true,
				listeners:{
					render: function(f){
                    	this.filter = new Ext.tree.TreeFilter(this, {
                    		clearBlank: true,
                    		autoClear: true
                    	});
					},
                    keydown: {
                        fn: this.filterTree,
                        buffer: 350,
                        scope: this
                    },
                    scope: this
				}
			}), ' ', ' ', 
			{
                iconCls: 'icon-expand-all',
				tooltip: 'Expand All',
                handler: function(){ this.root.expand(true); },
                scope: this
            }, '-', {
                iconCls: 'icon-collapse-all',
                tooltip: 'Collapse All',
                handler: function(){ this.root.collapse(true); },
                scope: this
            }, '-', [home]
			]
        })
        ApiPanel.superclass.initComponent.call(this);
    },
	filterTree: function(t, e){
		var text = t.getValue();
		Ext.each(this.hiddenPkgs, function(n){
			n.ui.show();
		});
		if(!text){
			this.filter.clear();
			return;
		}
		this.expandAll();
		
		//var re = new RegExp('^' + Ext.escapeRe(text) + '^', 'i');
		var re = new RegExp(Ext.escapeRe(text), 'i');
		this.filter.filterBy(function(n){
			return !n.attributes.titre || re.test(n.text+n.attributes.norme);
		});
		
		// hide empty packages that weren't filtered
		this.hiddenPkgs = [];
                var me = this;
		this.root.cascade(function(n){
			if(!n.attributes.titre && n.ui.ctNode.offsetHeight < 3){
				n.ui.hide();
				me.hiddenPkgs.push(n);
			}
		});
	}
});
	
Ext.onReady(function(){

    var detailsText = '<font face=arial size=1>'+
	'PREREQUIS : CONNEXION <a href=http://gedoq7.cete-lyon.i2/ennov/cete69doc target="_right">GedOQ</a> ETABLIE<br>'+
	'LOGIN : visudlcf - pas de mot de passe</font>';
	
	var api = new ApiPanel();
	
	
	//var root = new Ext.tree.AsyncTreeNode({});
	
    var tree = new Ext.Panel({
        title: 'Documentation ISO/COFRAC - DLCF',
		tbar : [detailsText],
		renderTo: 'tree-div',
        layout: 'border',
	    width: 550,
        height: 600,
        items: [api
			/*
			,{
            xtype: 'treepanel',
            id: 'tree-panel',
            region: 'center',
            margins: '2 2 0 2',
            autoScroll: true,
	        rootVisible: false,
	        root: root,
            // Our custom TreeLoader:
	        loader: new Ext.app.DocLoader({
	            dataUrl:'docs.xml'
				}),
			tbar : [
				{	
				iconCls: 'icon-expand-all',
				handler : function(){root.expand(true);}
				}, '-', {
                iconCls: 'icon-collapse-all',
                handler: function(){root.collapse(true);}
				}]
			},
			*/
			]
    });
	
});
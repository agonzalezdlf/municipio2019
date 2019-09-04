package mx.gob.municipio.centro.model.gateways.sam;

import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRichTextString;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;


public class GatewayExcelOPDetalle extends AbstractExcelView {

private static Logger log = Logger.getLogger(GatewayExcelOPDetalle.class.getName());
	
	CellStyle rowStyle = null;
	String[] headers = null;
    int rowNum = 0;
    int colNum = 0;
    
    
	@Override
	protected void buildExcelDocument(Map model, HSSFWorkbook workbook,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

				//Debermos añadir al menos una hoja
				HSSFSheet excelSheet = workbook.createSheet("Ordenes de Pago");
				//Pasa como parametros la hoja creada y el libro
		        setExcelHeader(excelSheet, workbook);
		      
		       	//Nombra el libro de excel 
				response.setHeader("Content-disposition", "attachment;filename=\"" + excelSheet.getSheetName() + ".xls\"");
				
				
				//Pasa como parametros la hoja de excel, el modelo o datos contenidos en el y el libro 	
				setExcelRows(excelSheet,model, workbook);
				
				//Ajusta el ancho de la columna para ajustarse a los contenidos.
				excelSheet.autoSizeColumn(0);
				excelSheet.autoSizeColumn(1);
			 	excelSheet.autoSizeColumn(2);
			 	excelSheet.autoSizeColumn(3);
			 	excelSheet.autoSizeColumn(4);
			 	excelSheet.autoSizeColumn(5);
			 	excelSheet.autoSizeColumn(6);
			 	excelSheet.autoSizeColumn(7);
			 	excelSheet.autoSizeColumn(8);
			 	excelSheet.autoSizeColumn(9);
			 	excelSheet.autoSizeColumn(10);
			 	
			 
		
	}


public void setExcelHeader(HSSFSheet excelSheet, Workbook woorkbook) {
		
		CellStyle headerStyle = null;
	
		
		// create style for header cells
		//
	    headerStyle = excelSheet.getWorkbook().createCellStyle();
	    
	    DataFormat formato = woorkbook.createDataFormat();
	    Font fonts = excelSheet.getWorkbook().createFont();
	    fonts.setFontName("Arial");
	    fonts.setBold(true);
	    fonts.setFontHeightInPoints((short)10); //Tamaño de letra
	    headerStyle.setFillForegroundColor(HSSFColor.GREY_40_PERCENT.index);//Fondo de la celda
	    headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
	    headerStyle.setFont(fonts);
	  
	    
	    headerStyle.setAlignment(HorizontalAlignment.CENTER);//setAlignment(HorizontalAlignment align)
	 		 
		// create header row
		HSSFRow excelHeader = excelSheet.createRow(0);
		
		excelHeader.createCell ((short) 0).setCellValue ("NUM_OP");
		excelHeader.getCell(0).setCellStyle(headerStyle);
		
		excelHeader.createCell ((short) 1).setCellValue ("MES_EJERCIDO"); 
		excelHeader.getCell(1).setCellStyle(headerStyle);
		
	 	excelHeader.createCell ((short) 2).setCellValue ("NOTA");
		excelHeader.getCell(2).setCellStyle(headerStyle);
			
		excelHeader.createCell ((short) 3).setCellValue ("ID_RECURSO"); 
		excelHeader.getCell(3).setCellStyle(headerStyle);
			
		excelHeader.createCell ((short) 4).setCellValue ("RECURSO"); 
		excelHeader.getCell(4).setCellStyle(headerStyle);
		
		excelHeader.createCell ((short) 5).setCellValue ("ID_PROYECTO"); 
		excelHeader.getCell(5).setCellStyle(headerStyle);
		
		excelHeader.createCell ((short) 6).setCellValue ("DESCRIPCION");  
		excelHeader.getCell(6).setCellStyle(headerStyle);
		
		excelHeader.createCell ((short) 7).setCellValue ("CLV_CAPITU");  
		excelHeader.getCell(7).setCellStyle(headerStyle);
		
		excelHeader.createCell ((short) 8).setCellValue ("CLV_PARTID"); 
		excelHeader.getCell(8).setCellStyle(headerStyle);
		
		excelHeader.createCell ((short) 9).setCellValue ("PARTIDA"); 
		excelHeader.getCell(9).setCellStyle(headerStyle);
		
		excelHeader.createCell ((short) 10).setCellValue ("IMPORTE");
		excelHeader.getCell(10).setCellStyle(headerStyle);
		
		
	}
	public void setExcelRows(HSSFSheet excelSheet, Map<String, Object> model, Workbook woorkbook){
		
		HSSFRow fila;
		HSSFCell celda = null; 
				
		Double disponible = 0d;
		rowStyle = excelSheet.getWorkbook().createCellStyle();
		DataFormat format = woorkbook.createDataFormat();
		Font fonts = excelSheet.getWorkbook().createFont();
		fonts.setFontHeightInPoints((short)8); //Tamaño de letra
		fonts.setFontName("ARIAL");
	    rowStyle.setFont(fonts);
		
		short numFila = 1;
		short colNum = 0;
		
		List<Map<String, Object>> NewModel = (List<Map<String, Object>>)model.get("listadomovimientos");
		
		rowStyle = woorkbook.createCellStyle();
		
		/*----ESTILO COLUMNA NUMERO DE ORDEN DE PAGO----*/
		CellStyle rowStyle_01 = woorkbook.createCellStyle();
		rowStyle_01.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_01.setDataFormat(format.getFormat("text"));
		/*----------------------------*/
		/*----ESTILO COLUMNA MES EJERCIDO----*/
		CellStyle rowStyle_02 = woorkbook.createCellStyle();
		rowStyle_02.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_02.setDataFormat(format.getFormat("0"));
		/*----------------------------*/
		/*----ESTILO COLUMNA NOTA----*/
		CellStyle rowStyle_03 = woorkbook.createCellStyle();
		rowStyle_03.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_03.setDataFormat(format.getFormat("text"));
		/*----------------------------*/
		/*----ESTILO COLUMNA ID_RECURSO----*/
		CellStyle rowStyle_04 = woorkbook.createCellStyle();
		rowStyle_04.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_04.setDataFormat(format.getFormat("0"));
		/*----------------------------*/
		/*----ESTILO COLUMNA RECURSO----*/
		CellStyle rowStyle_05 = woorkbook.createCellStyle();
		rowStyle_05.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_05.setDataFormat(format.getFormat("0"));
		/*----------------------------*/
		/*----ESTILO COLUMNA ID_PROYECTO----*/
		CellStyle rowStyle_06 = woorkbook.createCellStyle();
		rowStyle_06.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_06.setDataFormat(format.getFormat("0"));
		/*----------------------------*/
		/*----ESTILO COLUMNA PROYECTO----*/
		CellStyle rowStyle_07 = woorkbook.createCellStyle();
		rowStyle_07.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_07.setDataFormat(format.getFormat("text"));
		/*----------------------------*/
		/*----ESTILO COLUMNA CLAVE CAPITULO----*/
		CellStyle rowStyle_08 = woorkbook.createCellStyle();
		rowStyle_08.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_08.setDataFormat(format.getFormat("text"));
		/*----------------------------*/
		/*----ESTILO COLUMNA CLAVE PARTIDA----*/
		CellStyle rowStyle_09 = woorkbook.createCellStyle();
		rowStyle_09.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_09.setDataFormat(format.getFormat("text"));
		/*----------------------------*/
		/*----ESTILO COLUMNA PARTIDA----*/
		CellStyle rowStyle_10 = woorkbook.createCellStyle();
		rowStyle_10.setAlignment(HorizontalAlignment.LEFT);
		rowStyle_10.setDataFormat(format.getFormat("text"));
		/*----------------------------*/
		/*----ESTILO COLUMNA IMPORTE----*/
		CellStyle rowStyle_11 = woorkbook.createCellStyle();
		rowStyle_11.setAlignment(HorizontalAlignment.RIGHT);
		rowStyle_11.setDataFormat(format.getFormat("#,##0.00_);[Red](#,##0.00)"));
		
		
		for (Map<String, Object> p : NewModel) {
			
			/*disponible = Double.parseDouble(p.get("PRESUPUESTO_")!= null ? p.get("PRESUPUESTO_").toString(): "0") - 
					     Double.parseDouble(p.get("COMPROMETIDO_") != null ? p.get("COMPROMETIDO_").toString():"0") - 
					     Double.parseDouble(p.get("PRECOMPROMISO_") !=null  ? p.get("PRECOMPROMISO_").toString(): "0");*/
			
			//La hoja debemos añadirle las filas que deseemos. La numeración empieza en cero.
			fila = excelSheet.createRow(numFila++); 
			
			celda = (HSSFCell) fila.createCell((short)0);
			HSSFRichTextString tipoNomina = new HSSFRichTextString((p.get("NUM_OP").toString()));
			celda.setCellValue(tipoNomina);
			celda.setCellStyle(rowStyle_01);
			
			celda = (HSSFCell) fila.createCell((short)1);
			HSSFRichTextString id_recurso = new HSSFRichTextString((p.get("MES_EJERCIDO").toString()));
			celda.setCellValue(id_recurso);
			celda.setCellStyle(rowStyle_02);
			
			celda = (HSSFCell) fila.createCell((short)2);
			HSSFRichTextString clv_uniadm = new HSSFRichTextString((p.get("NOTA").toString()));
			celda.setCellValue(clv_uniadm);
			celda.setCellStyle(rowStyle_03);
			
			celda = (HSSFCell) fila.createCell((short)3);
			HSSFRichTextString id_proyecto = new HSSFRichTextString((p.get("ID_RECURSO").toString()));
			celda.setCellValue(id_proyecto);
			celda.setCellStyle(rowStyle_04);
			
			celda = (HSSFCell) fila.createCell((short)4);
			HSSFRichTextString n_programa = new HSSFRichTextString((p.get("RECURSO").toString()));
			celda.setCellValue(n_programa);
			celda.setCellStyle(rowStyle_05);
			
			celda = (HSSFCell) fila.createCell((short)5);
			HSSFRichTextString act_inst = new HSSFRichTextString((p.get("ID_PROYECTO").toString()));
			celda.setCellValue(act_inst);
			celda.setCellStyle(rowStyle_06);
			
			celda = (HSSFCell) fila.createCell((short)6);
			HSSFRichTextString descripcion = new HSSFRichTextString((p.get("DECRIPCION").toString()));
			celda.setCellValue(descripcion);
			celda.setCellStyle(rowStyle_07);
			
			celda = (HSSFCell) fila.createCell((short)7);
			HSSFRichTextString clv_cap = new HSSFRichTextString((p.get("CLV_CAPITU").toString()));
			celda.setCellValue(clv_cap);
			celda.setCellStyle(rowStyle_08);
			
			celda = (HSSFCell) fila.createCell((short)8);
			HSSFRichTextString clv_partida = new HSSFRichTextString((p.get("CLV_PARTID").toString()));
			celda.setCellValue(clv_partida);
			celda.setCellStyle(rowStyle_09);
			
			celda = (HSSFCell) fila.createCell((short)9);
			HSSFRichTextString partida = new HSSFRichTextString((p.get("PARTIDA").toString()));
			celda.setCellValue(partida);
			celda.setCellStyle(rowStyle_10);
			
			celda = (HSSFCell) fila.createCell((short)10);
			celda.setCellValue(Double.parseDouble(p.get("MONTO").toString()));
			celda.setCellStyle(rowStyle_11);
			
		}
	}
}
